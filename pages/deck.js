import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LangameIcon } from "../components/LangameIcon";
import { QuestionGenerator } from "../components/QuestionGenerator";
import CardList from "../components/CardList";
import { useQuestionStore } from "../store";
import CheckoutForm from "../components/CheckoutForm";
import Link from "next/link";
import { Header, Pattern2 } from ".";
import { CardCounter } from "../components/CardCounter";

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
