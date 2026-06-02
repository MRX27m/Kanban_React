import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Введіть email").email("Невірний формат email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Мінімум 2 символи"),
  email: z.string().min(1, "Введіть email").email("Невірний формат email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
