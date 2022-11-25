import create from "zustand";
import { persist } from "zustand/middleware";

export const useQuestionStore = create(
  persist(
    (set) => ({
      questions: [
        // { id: 1, name: "What is your favorite color?" }
      ],
      addQuestion: (question) =>
        set((state) => ({ questions: [...state.questions, question] })),
      rotateQuestions: () => {
        set((state) => {
          const last = state.questions.pop();
          return { questions: [last, ...state.questions] };
        });
      },
      removeQuestion: (questionId) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== questionId),
        })),
    }),
    {
      name: "question-storage", // unique name
    }
  )
);
