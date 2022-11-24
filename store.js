import create from "zustand";

export const useQuestionStore = create((set) => ({
  questions: [
    // { id: 1, name: "What is your favorite color?" }
  ],
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  // used for adding multiple questions at once
  addQuestions: (questions) =>
    set((state) => ({ questions: [...state.questions, ...questions] })),
  removeQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== questionId),
    })),
}));
