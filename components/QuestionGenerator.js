import { Input } from "./Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PrimaryButton } from "./PrimaryButton";
import { Spinner } from "./Spinner";
import { useQuestionStore } from "../store";

const topics = [
  `Ice Breaker, Philosophy`,
  "Deep Talk, Education",
  "Self exploration, Relationship",
  "Entrepreuneurship, Science",
  "Startup"
];

export const QuestionGenerator = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const addQuestion = useQuestionStore((state) => state.addQuestion);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
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
        setCounter((prev) => prev + 1);
        addQuestion({
          id: question.id,
          name: question.conversation_starter.en,
        });
      }, 500 * index);
    });
  };

  const handleInputTopic = (topic) => {
    setValue("topics", topic);
  };

  return (
    <div>
      <form
        className="flex flex-col sm:flex-row  gap-3 mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-base font-medium text-gray-900 min-h-[32px] mr-auto">
            {isSubmitted && `🙋 ${counter} questions generated `}
          </p>

          <div className="flex gap-3 mb-3 flex-wrap">
            {topics.map((topic) => (
              <span
                key={topic}
                onClick={() => handleInputTopic(topic)}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row  gap-3 mb-3">
            <Input
              className="min-h-[4rem]"
              placeholder="Enter topics separated by commas"
              defaultValue="Animals, Travel"
              {...register("topics", { required: true })}
            />
            <PrimaryButton
              type="submit"
              className="disabled:opacity-75 min-h-full w-full sm:min-w-max"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <>
                  <Spinner /> Our 🤖 is working hard
                </>
              )}
              {!isSubmitting && "Generate Conversation Starters"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
};
