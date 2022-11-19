import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { classNames, Input } from "../components/Input";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import create from "zustand";

const useQuestionStore = create((set) => ({
  questions: [],
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  removeQuestion: (question) =>
    set((state) => ({
      questions: state.questions.filter((q) => q !== question),
    })),
}));

const LangameIcon = ({ className = "" }) => {
  return (
    <Image
      className={classNames(className)}
      src="/langame.png"
      alt="langame"
      width="48"
      height="48"
    />
  );
};
const QuestionCard = ({ className, children }) => {
  return (
    <div
      className={classNames(
        "rounded-lg bg-white shadow-lg h-[330px] w-[232px] border-4 border-indigo-600 flex flex-col p-4 font-bold",
        className
      )}
    >
      <LangameIcon />
      <div className="m-auto text-center">{children}</div>

      <LangameIcon className="ml-auto" />
    </div>
  );
};

const Header = () => (
  <div>
    <h1 className="text-4xl leading-10 font-extrabold text-gray-900 ">
      AI-generated <br />
      card game to <br />
      enjoy with your <br />
      friends family
    </h1>
  </div>
);

const PrimaryButton = ({
  children,
  className = "",
  onClick = () => null,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
const SecondaryButton = ({
  children,
  className = "",
  onClick = () => null,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        "inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        className
      )}
    >
      {children}
    </button>
  );
};

const MOCK_QUESTIONS = [
  "Do you think it’s fair to call programming an art?",
  "When was the last time you felt like you were in the zone?",
  "What is the most important thing you learned in the last year?",
];
const QuestionGenerator = ({ children }) => {
  const [question, setQuestion] = useState(
    "What do you think about Hackers & Painters from Paul Graham?"
  );
  const addQuestion = useQuestionStore((state) => state.addQuestion);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    getQuestion(data);
  };

  const getQuestion = () => {
    // replace with API call
    const randomQuestion =
      MOCK_QUESTIONS[Math.floor(Math.random() * MOCK_QUESTIONS.length)];

    setQuestion(randomQuestion);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="min-h-[4rem]"
          defaultValue="Software Development, Painting, Books"
        />
        <PrimaryButton type="submit">
          🤖 Press to generate question about
        </PrimaryButton>
      </form>
      <div className="m-auto">
        <QuestionCard className="m-auto">{question}</QuestionCard>
      </div>
      <div className="flex justify-between">
        <PrimaryButton onClick={() => addQuestion(question)}>
          Add to Deck 🃏
        </PrimaryButton>
        {children}
      </div>
    </>
  );
};
const Deck = () => {
  const questions = useQuestionStore((state) => state.questions);

  const [currentQuestionIndex, setCurrentQuestion] = useState(0);
  const removeQuestion = useQuestionStore((state) => state.removeQuestion);

  useEffect(() => {
    setCurrentQuestion(questions.length - 1);
  }, [questions]);
  console.log(questions);

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };
  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  return (
    <>
      {`${currentQuestionIndex + 1}/${questions.length}`}
      <div className="relative m-auto min-h-[330px]">
        {questions.length === 0 && (
          <QuestionCard className="m-auto opacity-50">Your questions will appear here click on Add to Deck to get started!</QuestionCard>

        )}
        {questions.map((question, index) => (
          <QuestionCard
            className={`absolute left-[${8 * index}px]`}
            key={index}
          >
            {questions[currentQuestionIndex]}
          </QuestionCard>
        ))}
      </div>
      <div className="flex gap-3">
        <ArrowLeftCircleIcon height={48} onClick={handlePrevious} />
        <ArrowRightCircleIcon height={48} onClick={handleNext} />
        <MinusCircleIcon
          height={48}
          onClick={() => removeQuestion(questions[currentQuestionIndex])}
        />
      </div>
      <SecondaryButton>Pre-order Now 💵</SecondaryButton>
    </>
  );
};

const Main = () => {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <div>
      <QuestionGenerator>
        <SecondaryButton onClick={executeScroll}>See Your Deck</SecondaryButton>
      </QuestionGenerator>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-center">
          Checkout your personalized card game
        </h3>
        <ChevronDownIcon height={48} />
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
    <div className="m-auto p-8  max-w-lg">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
