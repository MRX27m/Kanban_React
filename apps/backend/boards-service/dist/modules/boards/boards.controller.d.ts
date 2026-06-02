import { BoardsService } from './boards.service';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    syncUser(data: {
        id: string;
        email: string;
        name: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    checkAccess(data: {
        boardId: string;
        userId: string;
    }): Promise<{
        id: string;
        userId: string;
        boardId: string;
        role: string;
    }>;
    findAll(data: {
        userId: string;
    }): Promise<({
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
    findOne(data: {
        id: string;
    }): Promise<{
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
    remove(data: {
        id: string;
    }): Promise<{
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
    getMembers(data: {
        boardId: string;
    }): Promise<({
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
