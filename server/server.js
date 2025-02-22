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

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "item one" }],
  [2, { priceInCents: 50000, name: "expensive item two" }],
]);

app.post("/api/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.map((item) => {
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
      }),
      success_url: `${process.env.SERVER_URL}/success/?id=${session.id}`,
      cancel_url: `${process.env.SERVER_URL}/failure`,
    });

    res.json({ url: session.url, id: session.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/products", (req, res) => {
  res.json(Array.from(storeItems.values()));
});

app.listen(3000, () => console.log("server running on localhost:3000"));

