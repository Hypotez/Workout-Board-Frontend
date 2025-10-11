import { z } from 'zod';

const emailSchema = z.email();
const usernameSchema = z.string();
const passwordSchema = z.string();

const usernameLoginSchema = z
  .object({
    identifier: usernameSchema,
    password: passwordSchema,
  })
  .transform(({ identifier, password }) => ({
    type: 'username',
    username: identifier,
    password,
  }));

const emailLoginSchema = z
  .object({
    identifier: emailSchema,
    password: passwordSchema,
  })
  .transform(({ identifier, password }) => ({
    type: 'email',
    email: identifier,
    password,
  }));

export const LoginUserSchema = z.union([emailLoginSchema, usernameLoginSchema]);

export const CreateUserSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});
