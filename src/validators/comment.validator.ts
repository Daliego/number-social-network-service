import { z } from "zod";

export const createCommentsSchema = z.object({
  body: z.object({
    operation: z.enum([
      "subtraction",
      "addition",
      "multiplication",
      "division",
    ]),
    text: z.string().min(2).max(300),
    userId: z.string().uuid(),
    publicationId: z.string().uuid(),
  }),
});

export const getAllCommentsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    id: z.string().optional(),
    typeId: z.string().optional(),
  }),
  body: z.object({
    email: z.string().email().optional(),
  }),
});

export const deleteCommentsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
