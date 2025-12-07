import { Player } from '@prisma/client';

export type CreatePlayerDto = Pick<
    Player,
    | 'name'
    | 'money'
    | 'status'
    | 'icon'
>;