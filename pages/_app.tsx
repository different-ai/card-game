import "../styles/globals.css";
import type { AppProps } from "next/app";
import { usePostHog } from "next-use-posthog";
import posthog from "posthog-js";
import { useEffect } from "react";
import {uuidv4} from 'uuid';
import { supabase } from "../lib/supabase";


export default function App({ Component, pageProps }: AppProps) {

  usePostHog("phc_XGOSiimQQpEK9TDZN7NZ6wkfy5gp81DNPDR4OLllda3", {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
    },
  })
  const addUser = async () => {
  if(!localStorage.getItem("user")){
    const id = uuidv4()
    const { data, error } = await supabase
  .from('lines')
  .select()
  .eq('id',id)
  if(!data?.length) {
    localStorage.setItem("user",id)
  }
   else {
    await addUser()
   }
  }
}
useEffect(() => {
  addUser()
},[])

  return <Component {...pageProps} />;
}
