import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("boards/:boardId/columns/:columnId/tasks")
export class TasksController {
  constructor(
    @Inject("BOARDS_SERVICE") private readonly boardsClient: ClientProxy,
    @Inject("TASKS_SERVICE") private readonly tasksClient: ClientProxy,
  ) {}

  @Get()
  async findAll(
    @Param("boardId") boardId: string,
    @Param("columnId") columnId: string,
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.tasksClient.send("tasks.find_all", { columnId }),
    );
  }

  @Post()
  async create(
    @Param("boardId") boardId: string,
    @Param("columnId") columnId: string,
    @Body() body: { text: string },
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.tasksClient.send("tasks.create", { text: body.text, columnId }),
    );
  }

  @Patch(":id")
  async update(
    @Param("boardId") boardId: string,
    @Param("id") id: string,
    @Body() body: { text?: string; order?: number },
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.tasksClient.send("tasks.update", { id, ...body }),
    );
  }

  @Patch(":id/move")
  async move(
    @Param("boardId") boardId: string,
    @Param("id") id: string,
    @Body() body: { targetColumnId: string },
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.tasksClient.send("tasks.move", {
        id,
        targetColumnId: body.targetColumnId,
      }),
    );
  }

  @Delete(":id")
  async remove(
    @Param("boardId") boardId: string,
    @Param("id") id: string,
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(this.tasksClient.send("tasks.remove", { id }));
  }

  private async checkAccess(boardId: string, userId: string) {
    return firstValueFrom(
      this.boardsClient.send("boards.check_access", { boardId, userId }),
    );
  }
}
