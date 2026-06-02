import { ClientProxy } from '@nestjs/microservices';
export declare class AuthController {
    private readonly authClient;
    private readonly boardsClient;
    constructor(authClient: ClientProxy, boardsClient: ClientProxy);
    register(body: {
        email: string;
        password: string;
        name: string;
    }): Promise<any>;
    login(body: {
        email: string;
        password: string;
    }): Promise<any>;
}
