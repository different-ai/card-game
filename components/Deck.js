import { classNames } from "./Input";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { SecondaryButton } from "./SecondaryButton";
import { useQuestionStore } from "../store";
import Card from "./Card";
import CardList from "./CardList";

export const Deck = ({ className }) => {
  const questions = useQuestionStore((state) => state.questions);

  const [currentQuestionIndex, setCurrentQuestion] = useState(0);
  const removeQuestion = useQuestionStore((state) => state.removeQuestion);

  const hasQuestions = questions.length > 0;
  const hasNextQuestion = !hasQuestions || currentQuestionIndex === 0;
  const hasPreviousQuestion =
    !hasQuestions || currentQuestionIndex === questions.length - 1;



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
    <div className={classNames("flex flex-col items-center gap-3", className)}>
      {/* {!hasQuestions && "No questions yet"} */}
      <div className="flex gap-3 z-20">
        <ArrowLeftCircleIcon
          className={classNames(
            "cursor-pointer",
            hasNextQuestion && "opacity-50"
          )}
          height={36}
          onClick={handlePrevious}
        />
        <ArrowRightCircleIcon
          className={classNames(
            "cursor-pointer",
            hasPreviousQuestion && "opacity-50"
          )}
          height={36}
          onClick={handleNext}
        />
        <MinusCircleIcon
          height={36}
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
            Your question will appear here.
          </QuestionCard>
        )}
        
        {hasQuestions && <CardList />}
      </div>

    </div>
  );
};
