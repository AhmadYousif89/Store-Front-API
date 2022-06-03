import express, { Router } from "express";
import { userAuth } from "../../middlewares/auth";
import { createCheckoutSession, createStripeWebhook } from "./stripeCreateSession";

const route = Router();

route.post("/stripe/checkout", userAuth, createCheckoutSession);
route.post("/stripe/webhook", createStripeWebhook, express.raw({ type: "application/json" }));

export default route;
