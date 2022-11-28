import { NextPage } from "next";
import { useRouter } from "next/router";

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
  if (!data) return <div>loading...</div>;

  return (
    <div className="page-container">
      <OrderConfirmation data={data} />
    </div>
  );
};

const products = [
  {
    id: 1,
    name: "Personal Card Game",
    description: "Your own card game",
    href: "#",
    quantity: 1,
    price: "$25.00",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg",
    imageAlt: "Glass bottle with black plastic pour top and mesh insert.",
  },
];
const OrderConfirmation = ({ data }: any) => {
  console.log(data);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {`It's on the way!`}
          </p>
          <p className="mt-2 text-base text-gray-500">
            {`Your order #${data?.created} will be with you soon. We'll send you an email with tracking details.`}
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex space-x-6 border-b border-gray-200 py-10"
            >
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={product.href}>{product.name}</a>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">{product.price}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Shipping address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{data.shipping_details.name}</span>
                    <span className="block">{data.shipping_details.address.line1}</span>
                    <span className="block">{data.shipping_details.address.line2}</span>
                    <span className="block">{`${data.shipping_details.address.city}, ${data.shipping_details.address.postal_code}`}</span>
                    <span className="block">
                      {data.shipping_details.address.state}
                    </span>
                    <span className="block">
                      {data.shipping_details.address.country}
                    </span>
                  </address>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
