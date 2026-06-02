import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    syncColumn(data: {
        id: string;
    }): Promise<{
        id: string;
    }>;
    findAll(data: {
        columnId: string;
    }): Promise<{
        id: string;
        text: string;
        order: number;
        columnId: string;
    }[]>;
    create(data: {
        text: string;
        columnId: string;
    }): Promise<{
        id: string;
        text: string;
        order: number;
        columnId: string;
    }>;
    update(data: {
        id: string;
        text?: string;
        order?: number;
    }): Promise<{
        id: string;
        text: string;
        order: number;
        columnId: string;
    }>;
    remove(data: {
        id: string;
    }): Promise<{
        id: string;
        text: string;
        order: number;
        columnId: string;
    }>;
    move(data: {
        id: string;
        targetColumnId: string;
    }): Promise<{
        id: string;
        text: string;
        order: number;
        columnId: string;
    }>;
}
