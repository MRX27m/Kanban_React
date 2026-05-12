import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BoardAccessGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    const boardId = request.params.boardId ?? request.params.id;

    if (!boardId) return true;

    const member = await this.prisma.boardMember.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });

    if (!member) {
      throw new ForbiddenException('Немає доступу до цієї дошки');
    }

    request.boardMember = member;

    return true;
  }
}
