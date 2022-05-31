import { Stripe } from "stripe";
import { Request, Response } from "express";
import { Error, Users } from "../../types/types";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { Order } from "../models/orders";
import { OrderDetails } from "../models/order_details";

const { STRIPE_SECRET_KEY, CLIENT_URL, ENDPOINT_SECRET } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY as string, { apiVersion: "2020-08-27" });

const createCheckoutSession = asyncWrapper(async (req: Request, res: Response) => {
  const user = req.user as Users;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const line_items = req.body.cartItems.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.p_name,
        images: [item.image_url],
        description: item.description,
        metadata: { productId: item._id },
      },
      unit_amount: item.price * 100,
    },
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
    },
    quantity: item.quantity,
  }));

  const customer = await stripe.customers.create({
    metadata: {
      userId: JSON.stringify(user._id),
      cartItems: JSON.stringify(req.body.cartItems),
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    customer: customer.id,
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_address_collection: { allowed_countries: ["EG"] },
    phone_number_collection: { enabled: true },
    shipping_options: [
      { shipping_rate: "shr_1L4qQEGG1hq9r8KDQXU37JpC" },
      { shipping_rate: "shr_1L4qUKGG1hq9r8KDi37KlD6J" },
    ],
    mode: "payment",
    success_url: `${CLIENT_URL}/checkout-success?success=true`,
    cancel_url: `${CLIENT_URL}/cart?canceled=true`,
  });

  res.status(200).json({ url: session.url });
});

const createStripeWebhook = async (req: Request, res: Response) => {
  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: ENDPOINT_SECRET as string,
  });

  try {
    stripe.webhooks.constructEvent(payloadString, header, ENDPOINT_SECRET as string);
    console.log(`Webhook Verified`);
  } catch (err) {
    console.log(`Webhook Error: ${(err as Error).message}`);
    res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    return;
  }

  const data = req.body.data.object;
  const eventType = req.body.type;

  const OrderToDatabase = async (customer: any, data: { status: string; customer: string }) => {
    await Order.createOrder({
      user_id: JSON.parse(customer.metadata.userId),
      stripe_customerId: data.customer,
      order_status: data.status,
    });
  };

  type Order = {
    customer: string;
    customer_details: object;
    shipping: object;
    payment_intent: string;
    payment_status: string;
    payment_method_types: string | [string];
    amount_subtotal: number;
    amount_total: number;
  };
  const OrderDetailsToDatabase = async (customer: any, data: Order) => {
    const info = {
      cart: JSON.parse(customer.metadata.cartItems),
      customer_info: data.customer_details,
      shipping_info: data.shipping,
      paymentIntent: data.payment_intent,
      payment_status: data.payment_status,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
    };
    await OrderDetails.createOrderDetails({
      _id: JSON.parse(customer.metadata.userId),
      customerId: data.customer,
      order_info: info,
    });
  };

  switch (eventType) {
    case "checkout.session.completed":
      try {
        stripe.customers.retrieve(data.customer).then((customer) => {
          OrderToDatabase(customer, data);
          OrderDetailsToDatabase(customer, data);
        });
      } catch (err) {
        console.log(err);
      }
      break;
    default: {
      console.log(`Unhandled event type ${eventType}`);
    }
  }

  res.status(200).send({ received: true }).end();
};

export { createCheckoutSession, createStripeWebhook };
