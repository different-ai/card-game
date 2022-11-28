import { MAX_QUESTIONS, MIN_QUESTIONS } from "../config";
import { useQuestionStore } from "../store";


export const CardCounter = () => {
  const { questions } = useQuestionStore((state) => state);

  const hasEnough = questions.length >= MIN_QUESTIONS;
  const hasTooMany = questions.length > MAX_QUESTIONS;
  return (
    <div>
      <div className="">
        <span>There are</span>
        <span>{` ${questions.length} `}</span>cards in your deck!
      </div>
      {!hasEnough && (
        <span className="text-2xl ">{`Only ${MIN_QUESTIONS - questions.length} cards missing to order!`}</span>
      )}
      {hasTooMany && (
        <span className="text-2xl ">{`Remove ${Math.abs(
          MAX_QUESTIONS - questions.length
        )} cards to order!`}</span>
      )}
    </div>
  );
};
