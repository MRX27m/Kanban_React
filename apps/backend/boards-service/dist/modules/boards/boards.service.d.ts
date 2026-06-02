import { PrismaService } from '../../prisma/prisma.service';
export declare class BoardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    syncUser(data: {
        id: string;
        email: string;
        name: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    checkAccess(boardId: string, userId: string): Promise<{
        id: string;
        userId: string;
        boardId: string;
        role: string;
    }>;
    findAll(userId: string): Promise<({
        members: {
            id: string;
            userId: string;
            boardId: string;
            role: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        members: ({
            user: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            boardId: string;
            role: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
    }>;
    create(data: {
        name: string;
        userId: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    addMember(data: {
        boardId: string;
        userId: string;
        email: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        userId: string;
        boardId: string;
        role: string;
    }>;
    getMembers(boardId: string): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        userId: string;
        boardId: string;
        role: string;
    })[]>;
}
