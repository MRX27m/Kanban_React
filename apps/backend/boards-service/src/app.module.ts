import { Module } from "@nestjs/common";
import { BoardsModule } from "./modules/boards/boards.module";

@Module({
  imports: [BoardsModule],
})
export class AppModule {}
