import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BoardsService } from "./boards.service";

@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @MessagePattern("boards.sync_user")
  syncUser(@Payload() data: { id: string; email: string; name: string }) {
    return this.boardsService.syncUser(data);
  }

  @MessagePattern("boards.check_access")
  checkAccess(@Payload() data: { boardId: string; userId: string }) {
    return this.boardsService.checkAccess(data.boardId, data.userId);
  }

  @MessagePattern("boards.find_all")
  findAll(@Payload() data: { userId: string }) {
    return this.boardsService.findAll(data.userId);
  }

  @MessagePattern("boards.find_one")
  findOne(@Payload() data: { id: string }) {
    return this.boardsService.findOne(data.id);
  }

  @MessagePattern("boards.create")
  create(@Payload() data: { name: string; userId: string }) {
    return this.boardsService.create(data);
  }

  @MessagePattern("boards.remove")
  remove(@Payload() data: { id: string }) {
    return this.boardsService.remove(data.id);
  }

  @MessagePattern("boards.add_member")
  addMember(
    @Payload() data: { boardId: string; userId: string; email: string },
  ) {
    return this.boardsService.addMember(data);
  }

  @MessagePattern("boards.get_members")
  getMembers(@Payload() data: { boardId: string }) {
    return this.boardsService.getMembers(data.boardId);
  }
}
