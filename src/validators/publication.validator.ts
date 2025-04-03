import { z } from "zod";

export const createPublicationSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(99),
    text: z.string().min(2).max(300),
    userId: z.string().uuid(),
  }),
});

export const getAllPublicationsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const deletePublicationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
