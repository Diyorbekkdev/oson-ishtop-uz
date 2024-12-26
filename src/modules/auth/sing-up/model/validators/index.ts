import { z } from "zod";

export const userNameSchema = z
	.string()
	.min(3, { message: "Username must be at least 3 characters long" })
	.max(20, { message: "Username cannot be more than 20 characters long" });

export const passwordSchema = z
	.string()
	.min(6, { message: "Password must be at least 6 characters long" })
	.nonempty({ message: "Password is required" });

export const SignUpSchema = z.object({
	username: userNameSchema,
	password: passwordSchema,
});
