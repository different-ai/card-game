import React from "react";
import { CARDS } from "../components/CardList";

type ArrayElementType<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type CardType = ArrayElementType<typeof CARDS>;

export type SwipeType = "like" | "nope" | "superlike";

export type ResultType = { [k in SwipeType]: number };

export type HistoryType = CardType & { swipe: SwipeType };

export interface CardProps {
  card: CardType;
  active: boolean;
  removeCard: (oldCard: CardType, swipe: SwipeType) => void;
  header: React.ReactNode;
  className?: string;
  cardNumber: number;
}
