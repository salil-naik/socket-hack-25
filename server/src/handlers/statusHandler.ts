import { stripe } from "./common";

export const statusHandler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await stripe.checkout.sessions.retrieve(body.session_id);

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