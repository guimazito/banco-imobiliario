import { GamePlayer } from '@prisma/client';

export type CreateGamePlayerDto = Pick<
    GamePlayer,
    | 'gameId'
    | 'playerId'
    | 'playerMoney'
    | 'playerStatus'
    | 'playerIcon'
>;

export type UpdateGamePlayerDto = Partial<
    Pick<
        GamePlayer,
        | 'gameId'
        | 'playerId'
        | 'playerMoney'
        | 'playerStatus'
        | 'playerIcon'
    >
>;