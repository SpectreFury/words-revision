"use client";

import React from "react";
import Flashcard from "./_components/flashcard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useFlashcardStore } from "@/store/flashcards";

const FlashCards = () => {
  const words = useQuery(api.words.getWords);
  const { selectedWord } = useFlashcardStore();

  return (
    <div className="flex justify-center items-center h-full mt-[200px]">
      {words?.map(
        (word, i) => selectedWord === i && <Flashcard currentWord={word} />
      )}
    </div>
  );
};

export default FlashCards;
