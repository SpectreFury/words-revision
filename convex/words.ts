import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getWords = query({
  handler: async (ctx) => {
    const words = await ctx.db.query("words").collect();

    return words;
  },
});

export const getFlashcardWords = mutation({
  handler: async (ctx) => {
    const words = await ctx.db.query("words").collect();

    return words;
  },
});

export const saveWord = mutation({
  args: {
    word: v.string(),
    meaning: v.string(),
    example: v.string(),
  },
  handler: async (ctx, args) => {
    const wordId = await ctx.db.insert("words", {
      word: args.word,
      meaning: args.meaning,
      example: args.example,
      status: "remembered",
    });

    return wordId;
  },
});

export const changeStatus = mutation({
  args: {
    wordId: v.id("words"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.wordId, {
      status: args.status,
    });
  },
});
