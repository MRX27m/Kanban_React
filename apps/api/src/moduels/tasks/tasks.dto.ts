import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createTaskSchema = z.object({
  text: z
    .string()
    .min(1, "Текст обов'язковий")
    .max(200, 'Максимум 200 символів'),
  columnId: z.string().optional(),
});

export const updateTaskSchema = z.object({
  text: z.string().min(1).max(200).optional(),
  order: z.number().int().min(0).optional(),
});

export const moveTaskSchema = z.object({
  direction: z.enum(['left', 'right']),
  targetColumnId: z.string().min(1),
});

export class CreateTaskDto extends createZodDto(createTaskSchema) {}
export class UpdateTaskDto extends createZodDto(updateTaskSchema) {}
export class MoveTaskDto extends createZodDto(moveTaskSchema) {}
