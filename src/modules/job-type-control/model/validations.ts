import { z } from "zod";

export const jobTypeControlSchema = z.object({
	nameUz: z.string().nonempty("O'zbekcha nomi majburiy"),
	nameEn: z.string().nonempty("Inglizcha nomi majburiy"),
	nameRu: z.string().nonempty("Ruscha nomi majburiy"),
	isThereTrialPeriod: z.boolean().optional(),
});
