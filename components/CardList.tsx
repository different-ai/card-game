import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CardType, HistoryType, ResultType, SwipeType } from "../types";
import Card from "./Card";
import { useQuestionStore } from "../store";
import RotateIcon from "./RotateIcon";
import { SecondaryButton } from "./SecondaryButton";
import { supabase } from "../lib/supabase";
const CardList = () => {
  const { questions, addQuestion, removeQuestion, rotateQuestions } =
    useQuestionStore((state) => state);
  const hasQuestions = questions?.length > 0;
  console.log({ questions });
  const cards = questions;
  const [hack, setHack] = useState(0);
  // todo: make this not a hack
  const activeIndex = cards?.length - 1;

  const [history, setHistory] = useState<HistoryType[]>([]);

  const removeCard = async (oldCard: CardType, swipe: SwipeType) => {
    const user_id = localStorage.getItem("user")
    let rating;
    if (swipe === "like") {
      rotateQuestions();
      setHack((prev) => prev + 1);
      rating = 1;
    }
    else if (swipe === 'superlike') {
      rating = 2;
      setHistory((current) => [...current, { ...oldCard, swipe }]);
      removeQuestion(oldCard.id);
    }
    else {
      rating = 0;
      setHistory((current) => [...current, { ...oldCard, swipe }]);
      removeQuestion(oldCard.id);
    }
    // Makes sure review isnt done on default
    if(oldCard.name !== "Your questions will appear here") {
      const { data, error: addUserError } = await supabase
      .from('lines')
      .insert([
        {user_id, question: oldCard.name, categories: oldCard.categories, rating, id: oldCard.id}
      ])
      if(addUserError) {
        console.log("ERROR WHEN RATING CARD", addUserError.message)
      }
    }
  };

  const undoSwipe = async () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card.id !== newCard.id;
        })
      );
      const { error: deleteError } = await supabase
      .from('lines')
      .delete()
      .eq('id',newCard.id)
      if(deleteError) {
        console.log("ERROR WHEN DELETING CARD", deleteError.message)
      }
      addQuestion(newCard);
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-[500px] gradient">
      <AnimatePresence>
        {cards?.map((card: any, index: number) => (
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
      {cards?.length === 0 ? (
        <AnimatePresence>
          <Card
            cardNumber={0}
            header=""
            key="0"
            active={true}
            card={{
              id: "0",
              name: "Your questions will appear here",
              categories: []
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
      </footer>
    </div>
  );
};

export default CardList;
