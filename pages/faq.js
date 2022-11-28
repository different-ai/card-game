import { Header } from "../components/Header";

const faqs = [
  {
    question: "How do I play?",
    answer: "Sit in a small group, pick a card and take turns answering",
  },
  {
    question: "How do I create my own deck?",
    answer:
      "Swipe left or right to select or deselect a card. Swiping right puts the card at the end of your deck, swiping left removes it from your deck.",
  },
  {
    question: "How much a deck costs?",
    answer: "$25",
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <Header />
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Can’t find the answer you’re looking for? Reach out to{" "}
                <a
                  href="mailto:contact@langa.me"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  us
                </a>
              </p>
            </div>
            <div className="mt-12 lg:col-span-2 lg:mt-0">
              <dl className="space-y-12">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-lg font-medium leading-6 text-gray-900">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
