import { NextPage } from "next";
import { useRouter } from "next/router";


import { fetchGetJSON } from "../utils/api-helpers";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";

const ResultPage: NextPage = () => {
  const router = useRouter();
  const [data, setData]: any = useState();
  const [error, setError] = useState();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  console.log(error);
  console.log(router.query.session_id);
  useEffect(() => {
    if (!router.query.session_id) return;
    axios
      .get(`/api/checkout_sessions/${router.query.session_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [router.query.session_id]);

  if (error) return <div>failed to load</div>;

  return (
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
        <h3>CheckoutSession response:</h3>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
  );
};

export default ResultPage;
