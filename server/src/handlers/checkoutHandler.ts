import {config} from "dotenv";
config();
import { storeItems, stripe, frontendUrl } from "./common";

export const checkoutHandler = async (event) => {
  try {
    const items = JSON.parse(event.body); 
    const lineItems = items.map((item) => {
      const storeItem = storeItems.get(item.id);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem?.name,
          },
          unit_amount: storeItem?.priceInCents,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/failure`,
    });
    return {
        body: JSON.stringify({ url: session.url, id: session.id }),
    }
  } catch (e) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message }),
    }
  }
};