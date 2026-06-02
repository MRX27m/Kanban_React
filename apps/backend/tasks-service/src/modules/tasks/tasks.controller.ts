import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TasksService } from "./tasks.service";

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern("tasks.sync_column")
  syncColumn(@Payload() data: { id: string }) {
    return this.tasksService.syncColumn(data);
  }

  @MessagePattern("tasks.find_all")
  findAll(@Payload() data: { columnId: string }) {
    return this.tasksService.findAll(data.columnId);
  }

  @MessagePattern("tasks.create")
  create(@Payload() data: { text: string; columnId: string }) {
    return this.tasksService.create(data);
  }

  @MessagePattern("tasks.update")
  update(@Payload() data: { id: string; text?: string; order?: number }) {
    return this.tasksService.update(data);
  }

  @MessagePattern("tasks.remove")
  remove(@Payload() data: { id: string }) {
    return this.tasksService.remove(data.id);
  }

  @MessagePattern("tasks.move")
  move(@Payload() data: { id: string; targetColumnId: string }) {
    return this.tasksService.move(data);
  }
}
