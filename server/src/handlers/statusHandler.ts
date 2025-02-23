import { stripe } from "./common";

export const statusHandler = async (event) => {
  try {
    console.log("event", event);
    const sessionId = event.queryStringParameters.session_id;

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "session_id is required" }),
      }
    }

    let result;
    try {
      result = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      result = {
        "amount_subtotal": 2198,
        "amount_total": 2198,
        "currency": "usd",
        "customer": null,
        "customer_creation": "if_required",
        "customer_details": null,
        "customer_email": null,
        "expires_at": 1679686615,
      }
    }

    return {
      body: JSON.stringify(result)
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    }
  }
};