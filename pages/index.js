import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

import { Headline } from "../components/Headline";
import { QuestionGenerator } from "../components/QuestionGenerator";
import { Deck } from "../components/Deck";

const Main = () => {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <div className="sm:grid sm:grid-cols-2">
      <div>
        <Headline />
        <QuestionGenerator></QuestionGenerator>
      </div>
      <div className="flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-center mb-3">
          Your Personalized Card Game
        </h3>
        <h4></h4>
        <ChevronDownIcon
          onClick={executeScroll}
          className="cursor sm:hidden"
          height={24}
        />
        <Deck />
        <div ref={myRef}></div>
      </div>
    </div>
  );
};
const Footer = () => {
  return <div></div>;
};

export default function Home() {
  return (
    <div className="m-auto p-8  max-w-5xl sm:pt-16">
      <Main />
      <Footer />
    </div>
  );
}
