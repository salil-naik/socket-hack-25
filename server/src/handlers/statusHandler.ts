import { stripe } from "./common";

export const statusHandler = async (event) => {
  try {
    const sessionId = event.queryStringParameters.session_id;
    const result = await stripe.checkout.sessions.retrieve(sessionId);

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