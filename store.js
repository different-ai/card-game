import create from "zustand";

export const useQuestionStore = create((set) => ({
  questions: [
    // { id: 1, name: "What is your favorite color?" }
  ],
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  rotateQuestions: () => {
    set((state) => {
      const [first, ...rest] = state.questions;
      return { questions: [...rest, first] };
    });
  },
  removeQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== questionId),
    })),
}));
