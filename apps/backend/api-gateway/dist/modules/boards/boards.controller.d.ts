import { ClientProxy } from '@nestjs/microservices';
export declare class BoardsController {
    private readonly boardsClient;
    private readonly columnsClient;
    constructor(boardsClient: ClientProxy, columnsClient: ClientProxy);
    findAll(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    create(body: {
        name: string;
    }, req: any): Promise<any>;
    remove(id: string, req: any): Promise<any>;
    addMember(boardId: string, body: {
        email: string;
    }, req: any): Promise<any>;
    getMembers(boardId: string, req: any): Promise<any>;
    private checkAccess;
}
