import { Input } from "./Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PrimaryButton } from "./PrimaryButton";
import { Spinner } from "./Spinner";
import { useQuestionStore } from "../pages/index";

export const QuestionGenerator = ({ children }) => {
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

    addQuestion(question);
  };

  return (
    <form className="flex flex-col sm:flex-row  gap-3" onSubmit={handleSubmit(onSubmit)}>
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
