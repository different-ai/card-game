import "../styles/globals.css";
import type { AppProps } from "next/app";
import { usePostHog } from "next-use-posthog";
import posthog from "posthog-js";

export default function App({ Component, pageProps }: AppProps) {
  posthog.init("phc_XGOSiimQQpEK9TDZN7NZ6wkfy5gp81DNPDR4OLllda3", {
    api_host: "https://app.posthog.com",
  });

  usePostHog("phc_XGOSiimQQpEK9TDZN7NZ6wkfy5gp81DNPDR4OLllda3", {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
    },
  });

  return <Component {...pageProps} />;
}
