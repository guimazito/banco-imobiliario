import { Game } from '@prisma/client';

export type CreateGameDto = Pick<
    Game,
    | 'invite'
    | 'status'
>;

export type UpdateGameDto = Partial<
    Pick<
        Game,
        | 'invite'
        | 'status'
    >
>;