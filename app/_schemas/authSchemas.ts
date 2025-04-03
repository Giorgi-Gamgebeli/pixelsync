import z from "zod";
import { UserSchemaDatabase } from "./databaseSchemas";

type SuperValidateTypes = {
  passwordConfirm: string;
  password: string;
};

const superValidate = (
  { passwordConfirm, password }: SuperValidateTypes,
  ctx: z.RefinementCtx,
) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["passwordConfirm"],
    });
  }
};

export const LoginSchema = z.object({
  email: UserSchemaDatabase.shape.email,

  password: z
    .string({
      message: "Only text is allowed",
    })
    .min(1, {
      message: "Password is required",
    }),
});

export const SignupSchema = z
  .object({
    userName: UserSchemaDatabase.shape.userName,

    email: UserSchemaDatabase.shape.email,

    password: z
      .string({
        message: "Only text is allowed",
      })
      .min(8, {
        message: "Password needs a minimum of 8 characters",
      }),

    passwordConfirm: z.string({
      message: "Only text is allowed",
    }),
  })
  .superRefine(superValidate);
