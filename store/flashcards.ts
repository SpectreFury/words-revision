import { create } from "zustand";

interface FlashcardStore {
  selectedWord: number;
  setNextWord: () => void;
}

const useFlashcardStore = create<FlashcardStore>((set) => ({
  selectedWord: 0,
  setNextWord: () => set((state) => ({ selectedWord: state.selectedWord + 1 })),
}));

export { useFlashcardStore };
