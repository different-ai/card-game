// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51M7z5aKvi2l7GmXJH08SjnpLneuV4IKqQy09bOy9aVqNtF8ZLDF3ase2LfpZsEbiTatK11w9L4vJwkK5r7mRIKKI00BN4BiPw8"
);


const handler = async (req, res) => {
  const origin = req.headers.origin;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1M7zOpKvi2l7GmXJDpld0AwW",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
};

export default handler;
