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
import axios from "axios";

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

const Headline = () => (
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



const Spinner = () => {
  // if (true) return <div>yo</div>
  return (
    <svg
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
const QuestionGenerator = ({ children }) => {
  const [question, setQuestion] = useState(
    "What do you think about Hackers & Painters from Paul Graham?"
  );
  const addQuestion = useQuestionStore((state) => state.addQuestion);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { topics } = data;
    const topicsArray = topics.split(",").map((t) => t.trim());
    await getQuestion(topicsArray);
  };

  const getQuestion = async (topics) => {
    const res = await axios.post("/api/questions", { topics });
    const question = res.data.question;

    setQuestion(question);
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PrimaryButton
          type="submit"
          className="mb-3 disabled:opacity-75"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />}
          🤖 Press to generate question about
        </PrimaryButton>
        <Input
          className="min-h-[4rem]"
          defaultValue="Software Development, Painting, Books"
          {...register("topics", { required: true })}
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
    <div className="flex flex-col items-center gap-3">
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

      <SecondaryButton className="max-w-max">Pre-order Now 💵</SecondaryButton>
    </div>
  );
};

const Main = () => {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <div className="sm:grid sm:grid-cols-2">
      <div>
        <Headline />
        <QuestionGenerator>
          <SecondaryButton className="sm:hidden" onClick={executeScroll}>
            See Your Deck
          </SecondaryButton>
        </QuestionGenerator>
      </div>
      <div className="flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-center mb-3">
          Checkout your personalized card game
        </h3>
        <ChevronDownIcon height={24} className="sm:hidden" />
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
