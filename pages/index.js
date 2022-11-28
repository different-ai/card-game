import { QuestionGenerator } from "../components/QuestionGenerator";
import CardList from "../components/CardList";
import CheckoutForm from "../components/CheckoutForm";
import { CardCounter } from "../components/CardCounter";
import { Pattern2 } from "../components/Pattern2";
import { Header } from "../components/Header";

export const navigation = [
  { name: "FAQ", href: "/faq" },
  { name: "Your Deck", href: "/deck" },
];

const Pattern = () => {
  return (
    <svg
      className="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden"
      width={640}
      height={784}
      fill="none"
      viewBox="0 0 640 784"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
          x={118}
          y={0}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={0}
            y={0}
            width={4}
            height={4}
            className="text-gray-200"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect
        y={72}
        width={640}
        height={640}
        className="text-gray-50"
        fill="currentColor"
      />
      <rect
        x={118}
        width={404}
        height={784}
        fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
      />
    </svg>
  );
};
export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <Pattern2 />

      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <Header />

        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-indigo-600">AI-generated </span>
                  <span className="block text-gray-900">
                    conversation card game to enjoy with your friends & family
                  </span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Create your personalized deck of cards and play with your
                friends. Select which cards should be part of your own deck by
                swiping 💅.
              </p>
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                <QuestionGenerator />
              </div>
            </div>

            <div className=" gap-3 relative mt-12 lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center min-w-[400px] flex-col ">
              {/* <Pattern /> */}
              <div className="flex flex-col items-center gap-3">
                <CheckoutForm />
                <CardCounter />
              </div>
              <CardList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
