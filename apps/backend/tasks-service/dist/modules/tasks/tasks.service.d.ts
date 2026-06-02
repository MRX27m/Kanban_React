import { PrismaService } from '../../prisma/prisma.service';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    syncColumn(data: {
        id: string;
    }): Promise<{
        id: string;
    }>;
    findAll(columnId: string): Promise<{
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
    remove(id: string): Promise<{
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
