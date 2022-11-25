import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

const isDev = process.env.NODE_ENV === "development";

const PRICE_ID = isDev
  ? "price_1M80UtKvi2l7GmXJLHgxLmTh"
  : "price_1M7zOpKvi2l7GmXJDpld0AwW";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        metadata: req.body.questions,
        line_items: [
          {
            // test -> price_1M80UtKvi2l7GmXJLHgxLmTh
            price: PRICE_ID,
            quantity: 1,
          },
        ],
        customer_email: req.body.email,
        payment_method_types: ["card"],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
