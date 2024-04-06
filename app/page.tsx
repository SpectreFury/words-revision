"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Id } from "@/convex/_generated/dataModel";

export type Word = {
  _id: Id<"words">;
  word: string;
  meaning: string;
  example: string;
  status: "remembered" | "forgotten" | "review";
};

const Home = () => {
  const saveWords = useMutation(api.words.saveWord);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState<"words" | "dictionary">("words");

  const words = useQuery(api.words.getWords);
  const changeStatus = useMutation(api.words.changeStatus);
  const [dictionaryWords, setDictionaryWords] = useState("");

  const router = useRouter();

  const addWord = async () => {
    setLoading(true);
    if (modalState === "words") {
      await saveWords({
        word,
        meaning,
        example,
      });
    } else {
      const words = dictionaryWords.split(" ");

      words.map(async (word) => {
        const response = await fetch(
          `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.NEXT_PUBLIC_DICTIONARY_API_KEY}`
        );
        const result = await response.json();

        console.log(result);

        await saveWords({
          word: word,
          meaning: result[0].shortdef[0],
          example:
            "quotes" in result[0]
              ? result[0].quotes[0].t
                  .replace("{qword}", "")
                  .replace("{/qword}", "")
              : "No example available",
        });
      });
    }
    setLoading(false);

    setOpen(false);
  };

  return (
    <div>
      <div className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="flex gap-2 mb-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Add words</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add GRE words</DialogTitle>
                  <DialogDescription>
                    Add new words to your title that is visible to all
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  {modalState === "words" && (
                    <React.Fragment>
                      <div>
                        <Label htmlFor="word" className="text-gray-600">
                          Word
                        </Label>
                        <Input
                          type="text"
                          id="word"
                          value={word}
                          onChange={(e) => setWord(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="meaning" className="text-gray-600">
                          Meaning
                        </Label>
                        <Input
                          type="text"
                          id="meaning"
                          value={meaning}
                          onChange={(e) => setMeaning(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="example" className="text-gray-600">
                          Example
                        </Label>
                        <Input
                          type="text"
                          id="example"
                          value={example}
                          onChange={(e) => setExample(e.target.value)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  {modalState === "dictionary" && (
                    <React.Fragment>
                      <div>
                        <Label
                          htmlFor="dictionary-words"
                          className="text-gray-600"
                        >
                          List of words
                        </Label>
                        <Input
                          type="text"
                          id="dictionary-words"
                          value={dictionaryWords}
                          onChange={(e) => setDictionaryWords(e.target.value)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <DialogFooter>
                  {modalState === "dictionary" && (
                    <Button onClick={() => setModalState("words")}>
                      Add individual words
                    </Button>
                  )}
                  {modalState === "words" && (
                    <Button onClick={() => setModalState("dictionary")}>
                      Add a list of words
                    </Button>
                  )}

                  <Button disabled={loading} onClick={addWord} type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => router.push("/flashcards")}>
              Flashcards
            </Button>
          </div>
          <div className="flex flex-col gap-4 min-h-[50vh]">
            <div className="w-full space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[150px]">Word</TableHead>
                          <TableHead>Meaning</TableHead>
                          <TableHead>Example Sentence</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {words?.map((tableWord: Word) => (
                          <TableRow>
                            <TableCell className="font-medium">
                              {tableWord.word}
                            </TableCell>
                            <TableCell>{tableWord.meaning}</TableCell>
                            <TableCell>{tableWord.example}</TableCell>
                            <TableCell>
                              <Select
                                defaultValue={tableWord.status}
                                onValueChange={(value) =>
                                  changeStatus({
                                    wordId: tableWord._id as Id<"words">,
                                    status: value,
                                  })
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue></SelectValue>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="remembered">
                                        Remembered
                                      </SelectItem>
                                      <SelectItem value="forgotten">
                                        Forgotten
                                      </SelectItem>
                                      <SelectItem value="review">
                                        Review
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </SelectTrigger>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
