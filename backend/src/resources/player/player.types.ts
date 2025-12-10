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