require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const frontendUrl = "http://localhost:5173"

const stripe = require("stripe")("k_test_51QvNJaDwAfJl7BpVQ1FSchHIoQZUpUtnKSsdgSyUNhEq7oPsorUi6hzihfZznkmuckDmkyDrGnjasFpdZf6OwsI3009tgh4NRm");

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "item one" }],
  [2, { priceInCents: 50000, name: "expensive item two" }],
]);

app.post("/api/checkout", async (req, res) => {
  try {
    const lineItems = req.body.map((item) => {
      const storeItem = storeItems.get(item.id);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name,
          },
          unit_amount: storeItem.priceInCents,
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

    res.json({ url: session.url, id: session.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/products", (req, res) => {
  res.json(Array.from(storeItems.values()));
});


app.post("/api/status", async (req, res) => {
    const result = await stripe.checkout.sessions.retrieve(req.body.session_id);
    const mainRes = await stripe.paymentIntents.retrieve(result.payment_intent);
    res.json(mainRes);
})
  

app.listen(3000, () => console.log("server running on localhost:3000"));

