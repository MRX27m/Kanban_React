import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const RegisterSchema = z.object({
  email: z.string().min(1, "Email обов'язковий").email('Невірний формат email'),
  password: z
    .string()
    .min(6, 'Мінімум 6 символів')
    .max(50, 'Максимум 50 символів'),
  name: z.string().min(2, 'Мінімум 2 символи').max(30, 'Максимум 30 символів'),
});

const LoginSchema = z.object({
  email: z.string().min(1, "Email обов'язковий").email('Невірний формат email'),
  password: z.string().min(1, "Пароль обов'язковий"),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
export class LoginDto extends createZodDto(LoginSchema) {}
