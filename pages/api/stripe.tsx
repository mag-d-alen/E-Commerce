import { NextApiRequest, NextApiResponse } from "next";
import { ProductType } from "../../types/types";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const cartItems = req.body;
    if (!cartItems) {
      throw new Error("No items");
    }
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1M8lHZD1uD6HaJGrgI0XiucI" },
          { shipping_rate: "shr_1M8lJGD1uD6HaJGrOa4tRzFs" },
        ],
        line_items: cartItems.map((item: ProductType) => {
          const img = item.image.asset._ref;
          const newImg = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/ks7nc3h1/production/"
            )
            .replace("-webp", ".webp");
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
