import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ColumnsService } from "./columns.service";

@Controller()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @MessagePattern("columns.sync_board")
  syncBoard(@Payload() data: { id: string }) {
    return this.columnsService.syncBoard(data);
  }

  @MessagePattern("columns.find_all")
  findAll(@Payload() data: { boardId: string }) {
    return this.columnsService.findAll(data.boardId);
  }

  @MessagePattern("columns.create")
  create(@Payload() data: { name: string; boardId: string }) {
    return this.columnsService.create(data);
  }

  @MessagePattern("columns.update")
  update(@Payload() data: { id: string; name?: string; order?: number }) {
    return this.columnsService.update(data);
  }

  @MessagePattern("columns.remove")
  remove(@Payload() data: { id: string }) {
    return this.columnsService.remove(data.id);
  }

  @MessagePattern("columns.move")
  move(
    @Payload()
    data: {
      boardId: string;
      id: string;
      direction: "left" | "right";
    },
  ) {
    return this.columnsService.move(data);
  }
}
