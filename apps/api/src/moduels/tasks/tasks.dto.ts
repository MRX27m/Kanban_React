import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateTaskSchema = z.object({
  text: z
    .string()
    .min(1, "Текст обов'язковий")
    .max(200, 'Максимум 200 символів'),
  columnId: z.string().optional(),
});

const UpdateTaskSchema = z.object({
  text: z.string().min(1).max(200).optional(),
  order: z.number().int().min(0).optional(),
});

const MoveTaskSchema = z.object({
  direction: z.enum(['left', 'right']),
  targetColumnId: z.string().min(1),
});

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {}
export class MoveTaskDto extends createZodDto(MoveTaskSchema) {}
