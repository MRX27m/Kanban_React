import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateColumnSchema = z.object({
  name: z.string().min(1, "Назва обов'язкова").max(30, 'Максимум 30 символів'),
  boardId: z.string().optional(),
});

const UpdateColumnSchema = z.object({
  name: z.string().min(1).max(30).optional(),
  order: z.number().int().min(0).optional(),
});

const MoveColumnSchema = z.object({
  direction: z.enum(['left', 'right']),
});

export class CreateColumnDto extends createZodDto(CreateColumnSchema) {}
export class UpdateColumnDto extends createZodDto(UpdateColumnSchema) {}
export class MoveColumnDto extends createZodDto(MoveColumnSchema) {}
