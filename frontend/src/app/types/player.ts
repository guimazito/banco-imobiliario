import { PlayerStatus } from './playerStatus';
import { PlayerIcon } from './playerIcon';

export interface Player {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  money: number;
  status: PlayerStatus;
  icon: PlayerIcon;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreatePlayerDto {
  name: string;
  email: string;
  money: string;
  status: PlayerStatus;
  icon: PlayerIcon;
}

export interface UpdatePlayerDto {
  money?: number;
  status?: PlayerStatus;
}