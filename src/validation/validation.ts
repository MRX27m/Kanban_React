import { z } from "zod";

export const boardSchema = z
  .string()
  .min(1, "Поле не може бути порожнім")
  .min(5, "Мінімум 5 символів");
