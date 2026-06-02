import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        accessToken: string;
        userId: string;
        email: string;
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        accessToken: string;
        userId: string;
        email: string;
    }>;
    validateToken(token: string): Promise<{
        email: string;
        id: string;
        name: string;
    }>;
    private signToken;
}
