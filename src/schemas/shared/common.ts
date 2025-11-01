import { z } from 'zod';

export const uuidSchema = z.uuid('Not a valid UUID').brand<'Uuid'>();
export const nonEmptyStringSchema = z
  .string()
  .min(1, 'String cannot be empty')
  .brand<'NonEmptyString'>();

export type UuidType = z.infer<typeof uuidSchema>;
export type NonEmptyString = z.infer<typeof nonEmptyStringSchema>;
