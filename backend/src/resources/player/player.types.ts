import { Player } from '@prisma/client';

export type CreatePlayerDto = Pick<
    Player,
    | 'name'
    | 'email'
    | 'password'
    | 'money'
    | 'status'
    | 'icon'
>;

export type UpdatePlayerDto = Partial<
    Pick<
        Player,
        | 'money'
        | 'status'
    >
>;