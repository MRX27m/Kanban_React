import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    validateToken(data: {
        token: string;
    }): Promise<{
        email: string;
        id: string;
        name: string;
    }>;
}
