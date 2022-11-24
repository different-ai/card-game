import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CardType, HistoryType, ResultType, SwipeType } from "../types";
import Card from "./Card";
import { useQuestionStore } from "../store";
import RotateIcon from "./RotateIcon";
import { SecondaryButton } from "./SecondaryButton";

const CardList = () => {
  const { questions, addQuestion, removeQuestion, rotateQuestions } =
    useQuestionStore((state) => state);
  const hasQuestions = questions.length > 0;
  console.log({ questions });
  const cards = questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(questions.length - 1);
  }, [questions]);
  // todo: make this not a hack
  const [hack, setHack] = useState(0);
  const activeIndex = cards.length - 1;

  const [history, setHistory] = useState<HistoryType[]>([]);

  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
    if (swipe === "like") {
      rotateQuestions();
      setHack((prev) => prev + 1);
      return;
    }
    setHistory((current) => [...current, { ...oldCard, swipe }]);
    removeQuestion(oldCard.id);
  };

  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card.id !== newCard.id;
        })
      );
      addQuestion(newCard);
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-[500px] gradient">
      <div className="absolute top-[-25px] font-medium">
        <span>There are</span>
        <span>{` ${questions.length} `}</span>cards in your deck!
      </div>
      <AnimatePresence>
        {cards.map((card: any, index: number) => (
          <Card
            key={card.name}
            active={index === activeIndex}
            removeCard={removeCard}
            cardNumber={index + hack}
            card={card}
            header=""
          />
        ))}
      </AnimatePresence>
      {cards.length === 0 ? (
        <AnimatePresence>
          <Card
            cardNumber={0}
            header=""
            key="0"
            active={true}
            card={{
              id: "0",
              name: "Your questions will appear here",
            }}
            removeCard={() => null}
          />
        </AnimatePresence>
      ) : null}
      <footer className="absolute bottom-[-100px] flex items-center flex-col gap-3">
        <div className="flex flex-col items-center space-y-2">
          <button
            disabled={history.length === 0}
            className="rounded-md  px-6 py-3 bg-white inline-flex justify-center items-center disabled:text-gray-400"
            onClick={undoSwipe}
            data-testid="undo-btn"
            aria-label="Undo Swipe"
          >
            <RotateIcon strokeWidth={3} />
            <span className="text-xs">Undo</span>
          </button>
        </div>
        <SecondaryButton className="max-w-max">
          Pre-order Now 💵
        </SecondaryButton>
        {/* <Counter label="Likes" count={result.like} testid="like-count" />
        <Counter label="Nopes" count={result.nope} testid="nope-count" />
        <Counter
          label="Superlike"
          count={result.superlike}
          testid="superlike-count"
        /> */}
      </footer>
    </div>
  );
};

export default CardList;
