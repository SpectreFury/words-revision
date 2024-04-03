"use client";

import React, { useState, useEffect } from "react";
import Flashcard from "./_components/flashcard";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useFlashcardStore } from "@/store/flashcards";
import { Word } from "../page";

const FlashCards = () => {
  const [words, setWords] = useState<Word[]>([]);

  const getFlashcardWords = useMutation(api.words.getFlashcardWords);

  const shuffle = (array: Word[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchWords = async () => {
      const flashcardWords = await getFlashcardWords();
      console.log(flashcardWords);
      const shuffledWords = shuffle(flashcardWords);

      setWords(shuffledWords);
    };

    fetchWords();
  }, []);

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
