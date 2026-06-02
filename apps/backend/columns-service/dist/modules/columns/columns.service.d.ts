import { PrismaService } from '../../prisma/prisma.service';
export declare class ColumnsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    syncBoard(data: {
        id: string;
    }): Promise<{
        id: string;
    }>;
    findAll(boardId: string): Promise<{
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
    remove(id: string): Promise<{
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
