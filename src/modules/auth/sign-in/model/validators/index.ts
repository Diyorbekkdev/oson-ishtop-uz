import { z } from "zod";

export const useEmailOrUsername = z
	.string()
	.transform((value) => value.trim())
	.refine(
		(value) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

			return emailRegex.test(value) || usernameRegex.test(value);
		},
		{
			message:
				"Input must be a valid email or username (3-20 alphanumeric characters)",
		},
	);

export const passwordSchema = z
	.string()
	.min(2, { message: "Parol uzunligi kamida 4 bo'lishi kerek" });

export const SignInSchema = z.object({
	username: useEmailOrUsername,
	password: passwordSchema,
});
