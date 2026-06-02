import { Controller, Post, Body, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy,
    @Inject("BOARDS_SERVICE") private readonly boardsClient: ClientProxy,
  ) {}

  @Post("register")
  async register(
    @Body() body: { email: string; password: string; name: string },
  ) {
    const result = await firstValueFrom(
      this.authClient.send("auth.register", body),
    );

    await firstValueFrom(
      this.boardsClient.send("boards.sync_user", result.user),
    );

    return result;
  }

  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    return firstValueFrom(this.authClient.send("auth.login", body));
  }
}
