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
@Controller("boards/:boardId/columns")
export class ColumnsController {
  constructor(
    @Inject("BOARDS_SERVICE") private readonly boardsClient: ClientProxy,
    @Inject("COLUMNS_SERVICE") private readonly columnsClient: ClientProxy,
    @Inject("TASKS_SERVICE") private readonly tasksClient: ClientProxy,
  ) {}

  @Get()
  async findAll(@Param("boardId") boardId: string, @Request() req) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.columnsClient.send("columns.find_all", { boardId }),
    );
  }

  @Post()
  async create(
    @Param("boardId") boardId: string,
    @Body() body: { name: string },
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    const result = await firstValueFrom(
      this.columnsClient.send("columns.create", {
        name: body.name,
        boardId,
      }),
    );

    await firstValueFrom(
      this.tasksClient.send("tasks.sync_column", { id: result.id }),
    );

    return result;
  }

  @Patch(":id")
  async update(
    @Param("boardId") boardId: string,
    @Param("id") id: string,
    @Body() body: { name?: string; order?: number },
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.columnsClient.send("columns.update", { id, ...body }),
    );
  }

  @Patch(":id/move")
  async move(
    @Param("boardId") boardId: string,
    @Param("id") id: string,
    @Body() body: { direction: "left" | "right" },
    @Request() req,
  ) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.columnsClient.send("columns.move", {
        boardId,
        id,
        direction: body.direction,
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
    return firstValueFrom(this.columnsClient.send("columns.remove", { id }));
  }

  private async checkAccess(boardId: string, userId: string) {
    return firstValueFrom(
      this.boardsClient.send("boards.check_access", { boardId, userId }),
    );
  }
}
