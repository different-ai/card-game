import { useQuestionStore } from "../store";
import { minimumQuestions } from "../pages/index";


export const CardCounter = () => {
  const { questions } = useQuestionStore((state) => state);
  const maximumQuestions = 150;

  const hasEnough = questions.length >= minimumQuestions;
  const hasTooMany = questions.length > maximumQuestions;
  return (
    <div>
      <div className="">
        <span>There are</span>
        <span>{` ${questions.length} `}</span>cards in your deck!
      </div>
      {!hasEnough && (
        <span className="text-2xl ">{`Only ${minimumQuestions - questions.length} cards missing to order!`}</span>
      )}
      {hasTooMany && (
        <span className="text-2xl ">{`Remove ${Math.abs(
          maximumQuestions - questions.length
        )} cards to order!`}</span>
      )}
    </div>
  );
};
