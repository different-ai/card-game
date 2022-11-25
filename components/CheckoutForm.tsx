import React, { useState } from "react";

import getStripe from "../utils/get-stripejs";
import { SecondaryButton } from "./SecondaryButton";
import axios from "axios";
import { useQuestionStore } from "../store";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const questions: any = useQuestionStore((state) => state.questions);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    // transform cards into a format that can be sent to the server
    // https://stripe.com/docs/api/metadata
    // You can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long.
    const formattedQuestions = questions.reduce(
      (a: any, v: any) => ({ ...a, [v.id]: v.name }),
      {}
    );

    const response = await axios.post("/api/checkout_sessions", {
      questions: formattedQuestions,
    });

    if (response.status === 500) {
      console.error(response.statusText);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.data.id,
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
        💵 Pre-order Now
      </SecondaryButton>
    </form>
  );
};

export default CheckoutForm;
