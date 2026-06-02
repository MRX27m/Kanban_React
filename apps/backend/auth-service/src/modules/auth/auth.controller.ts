import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern("auth.register")
  register(@Payload() data: { email: string; password: string; name: string }) {
    return this.authService.register(data);
  }

  @MessagePattern("auth.login")
  login(@Payload() data: { email: string; password: string }) {
    return this.authService.login(data);
  }

  @MessagePattern("auth.validate_token")
  validateToken(@Payload() data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}
