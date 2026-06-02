import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Inject,
  ForbiddenException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "../../common/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("boards")
export class BoardsController {
  constructor(
    @Inject("BOARDS_SERVICE") private readonly boardsClient: ClientProxy,
    @Inject("COLUMNS_SERVICE") private readonly columnsClient: ClientProxy,
  ) {}

  @Get()
  findAll(@Request() req) {
    return firstValueFrom(
      this.boardsClient.send("boards.find_all", { userId: req.user.id }),
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req) {
    await this.checkAccess(id, req.user.id);
    return firstValueFrom(this.boardsClient.send("boards.find_one", { id }));
  }

  @Post()
  async create(@Body() body: { name: string }, @Request() req) {
    const result = await firstValueFrom(
      this.boardsClient.send("boards.create", {
        name: body.name,
        userId: req.user.id,
      }),
    );

    await firstValueFrom(
      this.columnsClient.send("columns.sync_board", { id: result.id }),
    );

    return result;
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Request() req) {
    const member = await this.checkAccess(id, req.user.id);
    if (member.role !== "owner") {
      throw new ForbiddenException("Тільки власник може видалити дошку");
    }
    return firstValueFrom(this.boardsClient.send("boards.remove", { id }));
  }

  @Post(":id/members")
  async addMember(
    @Param("id") boardId: string,
    @Body() body: { email: string },
    @Request() req,
  ) {
    const member = await this.checkAccess(boardId, req.user.id);
    if (member.role !== "owner") {
      throw new ForbiddenException("Тільки власник може додавати учасників");
    }
    return firstValueFrom(
      this.boardsClient.send("boards.add_member", {
        boardId,
        userId: req.user.id,
        email: body.email,
      }),
    );
  }

  @Get(":id/members")
  async getMembers(@Param("id") boardId: string, @Request() req) {
    await this.checkAccess(boardId, req.user.id);
    return firstValueFrom(
      this.boardsClient.send("boards.get_members", { boardId }),
    );
  }

  private async checkAccess(boardId: string, userId: string) {
    return firstValueFrom(
      this.boardsClient.send("boards.check_access", { boardId, userId }),
    );
  }
}
