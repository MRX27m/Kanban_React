import { Strategy } from 'passport-jwt';
import { ClientProxy } from '@nestjs/microservices';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    validate(req: any, payload: {
        sub: string;
        email: string;
    }): Promise<any>;
}
export {};
