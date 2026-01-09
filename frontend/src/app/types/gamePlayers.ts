import { PlayerStatus } from './playerStatus';
import { PlayerIcon } from './playerIcon';

export interface GamePlayer {
  gameId: string;
  playerId: string;
  playerMoney: number;
  playerStatus: PlayerStatus;
  playerIcon: PlayerIcon;
}

export interface CreateGamePlayerDto {
  gameId: string;
  playerId: string;
  playerMoney: number;
  playerStatus: PlayerStatus;
  playerIcon: PlayerIcon;
}

export interface UpdateGamePlayerDto {
  gameId: string;
  playerId: string;
  playerMoney: number;
  playerStatus: PlayerStatus;
  playerIcon: PlayerIcon;
}