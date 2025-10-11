import { z } from 'zod';

const successResponseSchema = z.object({
  status: z.literal('success'),
  data: z.any(),
});

const errorResponseSchema = z.object({
  status: z.literal('error'),
  error: z.string().nullable(),
});

export const ApiResponseSchema = z.union([successResponseSchema, errorResponseSchema]);
