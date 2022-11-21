import Image from "next/image";
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
  <div className="mb-6">
    <h1 className="text-4xl leading-10 font-extrabold text-gray-900 ">
      AI-generated card game to enjoy with your friends family
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
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PrimaryButton type="submit" className="mb-3">
          🤖 Press to generate question about
        </PrimaryButton>
        <Input
          className="min-h-[4rem]"
          defaultValue="Software Development, Painting, Books"
        />
      </form>
      <div className="m-auto">
        <QuestionCard className="m-auto">{question}</QuestionCard>
      </div>
      <div className="flex justify-between sm:justify-center">
        <PrimaryButton onClick={() => addQuestion(question)}>
          Add to Deck 🃏
        </PrimaryButton>
        {children}
      </div>
    </div>
  );
};

const Deck = () => {
  const questions = useQuestionStore((state) => state.questions);

  const [currentQuestionIndex, setCurrentQuestion] = useState(0);
  const removeQuestion = useQuestionStore((state) => state.removeQuestion);

  const hasQuestions = questions.length > 0;
  const hasNextQuestion = !hasQuestions || currentQuestionIndex === 0;
  const hasPreviousQuestion =
    !hasQuestions || currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    if (!hasQuestions) return;
    setCurrentQuestion(questions.length - 1);
  }, [questions, hasQuestions]);

  const handleNext = () => {
    if (hasPreviousQuestion) return;
    setCurrentQuestion((prev) => {
      return prev + 1;
    });
  };
  const handlePrevious = () => {
    if (hasNextQuestion) return;
    setCurrentQuestion((prev) => {
      return prev - 1;
    });
  };
  const handleRemoveQuestion = () => {
    if (!hasQuestions) return;
    removeQuestion(questions[currentQuestionIndex]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative m-auto min-h-[330px]">
        {!hasQuestions && (
          <QuestionCard className="m-auto opacity-50">
            Your questions will appear here click on Add to Deck to get started!
          </QuestionCard>
        )}
        {hasQuestions && (
          <QuestionCard>{questions[currentQuestionIndex]}</QuestionCard>
        )}
      </div>

      {hasQuestions && `${currentQuestionIndex + 1}/${questions.length}`}
      {!hasQuestions && "No questions yet"}
      <div className="flex gap-3">
        <ArrowLeftCircleIcon
          className={classNames(
            "cursor-pointer",
            hasNextQuestion && "opacity-50"
          )}
          height={48}
          onClick={handlePrevious}
        />
        <ArrowRightCircleIcon
          className={classNames(
            "cursor-pointer",
            hasPreviousQuestion && "opacity-50"
          )}
          height={48}
          onClick={handleNext}
        />
        <MinusCircleIcon
          height={48}
          className={classNames(
            "cursor-pointer",
            !hasQuestions && "opacity-50"
          )}
          onClick={handleRemoveQuestion}
        />
      </div>
      <SecondaryButton className="max-w-max">Pre-order Now 💵</SecondaryButton>
    </div>
  );
};

const Main = () => {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <div className="sm:flex sm:justify-between ">
      <QuestionGenerator>
        <SecondaryButton className="sm:hidden" onClick={executeScroll}>
          See Your Deck
        </SecondaryButton>
      </QuestionGenerator>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-center mb-3">
          Checkout your personalized card game
        </h3>
        <ChevronDownIcon height={48} className="sm:hidden" />
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
    <div className="m-auto p-8  max-w-4xl">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
