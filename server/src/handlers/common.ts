import {Stripe} from "stripe";
export const frontendUrl = "http://localhost:5173"
export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");

export const storeItems = new Map([
    [1, { priceInCents: 10000, name: "item one" }],
    [2, { priceInCents: 50000, name: "expensive item two" }],
  ]);
  