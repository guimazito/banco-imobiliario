import { Player } from '@prisma/client';

export type CreatePlayerDto = Pick<
    Player,
    | 'username'
    | 'password'
    | 'profileId'
>;

export type UpdatePlayerDto = Partial<
    Pick<
        Player,
        | 'username'
        | 'password'
        | 'profileId'
    >
>;