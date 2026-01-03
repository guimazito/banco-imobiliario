import { PlayerStatus } from './playerStatus';
import { PlayerIcon } from './playerIcon';

export interface Player {
  id: string;
  username: string;
  password?: string | null;
  money: number;
  status: PlayerStatus;
  icon: PlayerIcon;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreatePlayerDto {
  username: string;
  money: string;
  status: PlayerStatus;
  icon: PlayerIcon;
}

export interface UpdatePlayerDto {
  money?: number;
  status?: PlayerStatus;
}