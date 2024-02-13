"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Word } from "../../page";
import { useFlashcardStore } from "@/store/flashcards";

interface FlashcardProps {
  currentWord: Word;
}

const Flashcard = ({ currentWord }: FlashcardProps) => {
  const [flipped, setFlipped] = useState(false);
  const { setNextWord } = useFlashcardStore();

  return (
    <Card>
      {flipped ? (
        <React.Fragment>
          <CardContent>
            <div className="flex flex-col py-6 max-w-[500px] gap-2">
              <div className="text-xl font-bold">{currentWord.word}</div>
              <div className="text-muted-foreground">{currentWord.meaning}</div>
              <div className="italic font-medium">{currentWord.example}</div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button
                className="bg-green-500 hover:bg-green-300"
                onClick={() => setNextWord()}
              >
                I knew it
              </Button>
              <Button className="bg-red-500 hover:bg-red-300">I forgot</Button>
            </div>
          </CardFooter>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CardContent className="min-w-[500px] min-h-[200px] flex justify-center items-center flex-col gap-2">
            <p className="text-5xl">{currentWord.word}</p>
            <Button variant="ghost" onClick={() => setFlipped(true)}>
              Tap to reveal
            </Button>
          </CardContent>
        </React.Fragment>
      )}
    </Card>
  );
};

export default Flashcard;
