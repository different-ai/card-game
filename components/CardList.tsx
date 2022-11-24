import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
// import RotateIcon from "@icons/RotateIcon";
// import Counter from "@components/Counter";
import { CardType, HistoryType, ResultType, SwipeType } from "../types";
import Head from "next/head";
import Card from "./Card";
import { useQuestionStore } from "../store";
import RotateIcon from "./RotateIcon";

const CardList = () => {
  const { questions, addQuestion, removeQuestion } = useQuestionStore(
    (state) => state
  );
  const hasQuestions = questions.length > 0;
  console.log({ questions });
  const cards = questions;

  const [result, setResult] = useState<ResultType>({
    like: 0,
    nope: 0,
    superlike: 0,
  });
  const [history, setHistory] = useState<HistoryType[]>([]);
  // index of last card
  const activeIndex = cards.length - 1;
  console.log(cards.length, cards, activeIndex);

  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
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
    <div className="relative flex flex-col justify-center items-center w-full min-h-[350px] gradient">
      <AnimatePresence>
        {cards.map((card: any, index: number) => (
          <Card
            key={card.name}
            active={index === activeIndex}
            removeCard={removeCard}
            cardNumber={index}
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
      <footer className="absolute bottom-4 flex items-center space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <button
            disabled={history.length === 0}
            className="w-14 h-14 rounded-full bg-white inline-flex justify-center items-center disabled:color-gray-400"
            onClick={undoSwipe}
            data-testid="undo-btn"
            aria-label="Undo Swipe"
          >
            <RotateIcon strokeWidth={3} />
          </button>
          <span className="text-xs">Undo</span>
        </div>
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
