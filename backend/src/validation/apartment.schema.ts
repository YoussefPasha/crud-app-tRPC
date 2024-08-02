import { z } from "zod";

export const createApartmentSchema = z.object({
  name: z
    .string()
    .min(5, "Name is required and should be at least 5 characters"),
  address: z
    .string()
    .min(5, "Address is required and should be at least 5 characters"),
  imageUrl: z.string().url().optional(),
  city: z
    .string()
    .min(5, "City is required and should be at least 5 characters"),
  state: z
    .string()
    .min(5, "State is required and should be at least 5 characters"),
  zipCode: z
    .string()
    .regex(/^[1-9]{5}$/, "Zip code should be exactly 5 digits from 1 to 9")
    .min(5, "Zip code is required")
    .max(5, "Zip code is required"),
  units: z
    .string()
    .regex(/^[1-9][0-9]?$|^100$/, "Units should be between 1 and 100")
    .min(1, "At least one unit is required")
    .max(3, "Units should not exceed 100"),
  price: z
    .string()
    .regex(/^[1-9][0-9]{6,}$/, "Price should be at least 1000000")
    .min(6, "Price is required and should be at least 1000000"),
});
