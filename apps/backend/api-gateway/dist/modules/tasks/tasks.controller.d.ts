import { ClientProxy } from '@nestjs/microservices';
export declare class TasksController {
    private readonly boardsClient;
    private readonly tasksClient;
    constructor(boardsClient: ClientProxy, tasksClient: ClientProxy);
    findAll(boardId: string, columnId: string, req: any): Promise<any>;
    create(boardId: string, columnId: string, body: {
        text: string;
    }, req: any): Promise<any>;
    update(boardId: string, id: string, body: {
        text?: string;
        order?: number;
    }, req: any): Promise<any>;
    move(boardId: string, id: string, body: {
        targetColumnId: string;
    }, req: any): Promise<any>;
    remove(boardId: string, id: string, req: any): Promise<any>;
    private checkAccess;
}
