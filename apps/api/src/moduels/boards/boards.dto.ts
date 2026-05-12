import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createBoardSchema = z.object({
  name: z
    .string()
    .min(1, 'Поле не може бути порожнім')
    .min(5, 'Мінімум 5 символів')
    .max(50, 'Максимум 50 символів'),
});

export const addMemberSchema = z.object({
  email: z.string().min(1, "Email обов'язковий").email('Невірний формат email'),
});

export class CreateBoardDto extends createZodDto(createBoardSchema) {}
export class AddMemberDto extends createZodDto(addMemberSchema) {}
