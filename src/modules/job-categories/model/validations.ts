import { z } from "zod";

export const parentSchema = z.object({
	nameUz: z.string().nonempty("O'zbekcha nomi majburiy"),
	nameEn: z.string().nonempty("Inglizcha nomi majburiy"),
	nameRu: z.string().nonempty("Ruscha nomi majburiy"),
});

export const childSchema = z.object({
	nameUz: z.string().nonempty("O'zbekcha nomi majburiy"),
	nameEn: z.string().nonempty("Inglizcha nomi majburiy"),
	nameRu: z.string().nonempty("Ruscha nomi majburiy"),
});
