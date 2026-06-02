import { ClientProxy } from '@nestjs/microservices';
export declare class ColumnsController {
    private readonly boardsClient;
    private readonly columnsClient;
    private readonly tasksClient;
    constructor(boardsClient: ClientProxy, columnsClient: ClientProxy, tasksClient: ClientProxy);
    findAll(boardId: string, req: any): Promise<any>;
    create(boardId: string, body: {
        name: string;
    }, req: any): Promise<any>;
    update(boardId: string, id: string, body: {
        name?: string;
        order?: number;
    }, req: any): Promise<any>;
    move(boardId: string, id: string, body: {
        direction: 'left' | 'right';
    }, req: any): Promise<any>;
    remove(boardId: string, id: string, req: any): Promise<any>;
    private checkAccess;
}
