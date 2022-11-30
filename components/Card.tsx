import { PanInfo, motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { CardProps } from "../types";
import { LangameIcon } from "./LangameIcon";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Card: React.FC<CardProps> = ({
  card,
  removeCard,
  active,
  header,
  className = "",
  cardNumber = 0,
}) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);
  const [currentAction, setCurrentAction] = useState("");

  const onDragStart = async (_e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setCurrentAction("keep");
      await sleep(200);
      setCurrentAction("");
      return;
    }
    if (info.offset.x < -100) {
      setCurrentAction("remove");
      await sleep(200);
      setCurrentAction("");
      return;
    }
    if (info.offset.x === 0) {
      setCurrentAction("");
      return;
    }
  };

  const onDragEnd = async (_e: any, info: PanInfo) => {
    let rating;
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(card, "superlike");
      rating = 2
    }
    else {
      if (info.offset.x > 100) {
        setLeaveX(1000);
        removeCard(card, "like");
        rating = 1
      }
      if (info.offset.x < -100) {
        setLeaveX(-1000);
        removeCard(card, "nope");
        rating = 0
      }
    }
    if(card.name !== "Your questions will appear here") {
    const { data, error: addUserError } = await supabase
    .from('lines')
    .insert([
      {question: card.name , categories: card.categories, rating}
    ])
    if(addUserError) {
      console.log("ERROR WHEN RATING CARD", addUserError.message)
    }
  }
  }
  const classNames = `absolute h-[430px] w-[300px] bg-white shadow-xl rounded-2xl flex flex-col cursor-grab border-4 border-indigo-600 p-4 ${className}`;
  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDrag={onDragStart}
          onDragEnd={onDragEnd}
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.05,
            rotate: `${cardNumber % 2 === 0 ? 6 : -6}deg`,
          }}
          exit={{
            x: leaveX,
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={classNames}
          data-testid="active-card"
        >
          <div className="flex justify-between">
            <LangameIcon />{" "}
            <div className="text-gray-700 text-xs">{header}</div>
          </div>

          <div className="absolute z-30 text-xl top-20 origin-bottom -rotate-12 ">
            {currentAction === "keep" ? (
              <span className="text-indigo-600 border rounded-md border-indigo-600 px-2">
                Keep
              </span>
            ) : null}
            {currentAction === "remove" ? (
              <span className="text-red-600 border border-red-600 rounded-md px-2">
                Remove
              </span>
            ) : null}
          </div>

          <div className="m-auto text-center">
            <Title title={card.name} />
          </div>

          <LangameIcon className="ml-auto" />
        </motion.div>
      ) : (
        <div
          className={`${classNames} ${
            cardNumber % 2 === 0 ? "rotate-6" : "-rotate-6"
          } `}
        >
          <Title title={card.name} />
        </div>
      )}
    </>
  );
};

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <span className="text-xl font-bold text-center text-gray-800">{title}</span>;
};

export default Card;
