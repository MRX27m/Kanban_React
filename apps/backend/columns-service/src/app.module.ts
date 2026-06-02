import { Module } from "@nestjs/common";
import { ColumnsModule } from "./modules/columns/columns.module";

@Module({
  imports: [ColumnsModule],
})
export class AppModule {}
