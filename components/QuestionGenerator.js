import { Input } from "./Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PrimaryButton } from "./PrimaryButton";
import { Spinner } from "./Spinner";
import { useQuestionStore } from "../store";
import crypto from "crypto";

const delayLoop = (fn, delay) => {
  return (name, i) => {
    setTimeout(() => {
      fn(name);
    }, delay * 1000);
  };
};

export const QuestionGenerator = ({ children }) => {
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
    const questions = res.data.questions;
    console.log(questions);

    questions.forEach((question, index) => {
      setTimeout(() => {
        addQuestion({
          id: question.id,
          name: question.conversation_starter.en,
        });
      }, 500 * index);
    });
  };

  return (
    <form
      className="flex flex-col sm:flex-row  gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="min-h-[4rem]"
        placeholder="Enter topics separated by commas"
        defaultValue="Animals, Painting"
        {...register("topics", { required: true })}
      />
      <PrimaryButton
        type="submit"
        className="disabled:opacity-75 min-h-full"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <>
            <Spinner /> 🤖 Generating Question
          </>
        )}
        {!isSubmitting && "🤖 Generate Question"}
      </PrimaryButton>
    </form>
  );
};
