import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateBoardSchema = z.object({
  name: z
    .string()
    .min(1, 'Поле не може бути порожнім')
    .min(5, 'Мінімум 5 символів')
    .max(50, 'Максимум 50 символів'),
});

const AddMemberSchema = z.object({
  email: z.string().min(1, "Email обов'язковий").email('Невірний формат email'),
});

export class CreateBoardDto extends createZodDto(CreateBoardSchema) {}
export class AddMemberDto extends createZodDto(AddMemberSchema) {}
