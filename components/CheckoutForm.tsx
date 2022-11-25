import React, { useState } from "react";

import getStripe from "../utils/get-stripejs";
import { fetchPostJSON } from "../utils/api-helpers";
import * as config from "../config";
import { SecondaryButton } from "./SecondaryButton";
import StripeTestCards from "./StripeTestCards";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON("/api/checkout_sessions", {
      amount: input.customDonation,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SecondaryButton
        className="checkout-style-background"
        type="submit"
        disabled={loading}
      >
        Pre-order Now
      </SecondaryButton>
    </form>
  );
};

export default CheckoutForm;
