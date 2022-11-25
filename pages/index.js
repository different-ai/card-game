import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LangameIcon } from "../components/LangameIcon";
import { QuestionGenerator } from "../components/QuestionGenerator";
import CardList from "../components/CardList";
import { useQuestionStore } from "../store";
import CheckoutForm from "../components/CheckoutForm";
import Link from "next/link";

const navigation = [{ name: "FAQ", href: "/faq" }];

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
const Pattern2 = () => {
  return (
    <div className="hidden lg:absolute lg:inset-0 lg:block" aria-hidden="true">
      <svg
        className="absolute top-0 left-1/2 translate-x-64 -translate-y-8 transform"
        width={640}
        height={784}
        fill="none"
        viewBox="0 0 640 784"
      >
        <defs>
          <pattern
            id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
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
          fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
        />
      </svg>
    </div>
  );
};

const CardCounter = () => {
  const { questions } = useQuestionStore((state) => state);
  return (
    <div className="">
      <span>There are</span>
      <span>{` ${questions.length} `}</span>cards in your deck!
    </div>
  );
};
export const Header = () => {
  return (
    <>
      <Popover>
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/">
                  <span className="sr-only">Lang Game</span>
                  <LangameIcon />
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden md:ml-10 md:block md:space-x-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div></div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close main menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
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
