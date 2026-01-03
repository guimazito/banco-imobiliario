import { Game } from '@prisma/client';

export type CreateGameDto = Pick<
    Game,
    | 'status'
>;

export type UpdateGameDto = Partial<
    Pick<
        Game,
        | 'status'
    >
>;