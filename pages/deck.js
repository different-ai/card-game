import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LangameIcon } from "../components/LangameIcon";
import { QuestionGenerator } from "../components/QuestionGenerator";
import CardList from "../components/CardList";
import { useQuestionStore } from "../store";
import CheckoutForm from "../components/CheckoutForm";
import Link from "next/link";
import { CardCounter, Header } from ".";

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

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <Pattern2 />

      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 ">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3">
              <CheckoutForm />
              <CardCounter />
              <QuestionGenerator />
            </div>
            <CardList />
          </div>
        </main>
      </div>
    </div>
  );
}
