import express, { Router } from "express";
import authenticator from "../../middlewares/auth";
import { createCheckoutSession, createStripeWebhook } from "./stripeCreateSession";

const route = Router();

route.post("/stripe/checkout", authenticator, createCheckoutSession);
route.post("/stripe/webhook", createStripeWebhook, express.raw({ type: "application/json" }));

export default route;
