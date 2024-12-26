import * as Yup from "yup";
import { z } from "zod";

export const createAddsSchema = Yup.object({
	nameUz: Yup.string().required("O'zbekcha nomi majburiy"),
	nameEn: Yup.string().required("Inglizcha nomi majburiy"),
	nameRu: Yup.string().required("Ruscha nomi majburiy"),
	pricePerDay: Yup.number()
		.moreThan(0, "Kunlik narx 0 dan katta bo'lishi kerak")
		.required("Kunlik narx majburiy"),
});

export const updateAddSchema = z.object({
	nameUz: z.string().nonempty("O'zbekcha nomi majburiy"),
	nameEn: z.string().nonempty("Inglizcha nomi majburiy"),
	nameRu: z.string().nonempty("Ruscha nomi majburiy"),
	pricePerDay: z
		.number()
		.min(0, "Kunlik narx 0 dan katta bo'lishi kerak")
		.nonnegative("Narx 0 dan katta bo'lishi kerak"),
});
