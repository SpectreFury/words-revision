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

export type Word = {
  word: string;
  meaning: string;
  example: string;
};

const Home = () => {
  const saveWords = useMutation(api.words.saveWord);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const words = useQuery(api.words.getWords);

  const router = useRouter();

  const addWord = async () => {
    setLoading(true);
    await saveWords({
      word,
      meaning,
      example,
    });
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
                </div>
                <DialogFooter>
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
