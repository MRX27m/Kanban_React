import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createColumnSchema = z.object({
  name: z.string().min(1, "Назва обов'язкова").max(30, 'Максимум 30 символів'),
  boardId: z.string().optional(),
});

export const updateColumnSchema = z.object({
  name: z.string().min(1).max(30).optional(),
  order: z.number().int().min(0).optional(),
});

export const moveColumnSchema = z.object({
  direction: z.enum(['left', 'right']),
});

export class CreateColumnDto extends createZodDto(createColumnSchema) {}
export class UpdateColumnDto extends createZodDto(updateColumnSchema) {}
export class MoveColumnDto extends createZodDto(moveColumnSchema) {}
