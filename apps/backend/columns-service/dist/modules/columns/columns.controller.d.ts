import { ColumnsService } from './columns.service';
export declare class ColumnsController {
    private readonly columnsService;
    constructor(columnsService: ColumnsService);
    syncBoard(data: {
        id: string;
    }): Promise<{
        id: string;
    }>;
    findAll(data: {
        boardId: string;
    }): Promise<{
        id: string;
        name: string;
        order: number;
        boardId: string;
    }[]>;
    create(data: {
        name: string;
        boardId: string;
    }): Promise<{
        id: string;
        name: string;
        order: number;
        boardId: string;
    }>;
    update(data: {
        id: string;
        name?: string;
        order?: number;
    }): Promise<{
        id: string;
        name: string;
        order: number;
        boardId: string;
    }>;
    remove(data: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        order: number;
        boardId: string;
    }>;
    move(data: {
        boardId: string;
        id: string;
        direction: 'left' | 'right';
    }): Promise<{
        id: string;
        name: string;
        order: number;
        boardId: string;
    }[]>;
}
