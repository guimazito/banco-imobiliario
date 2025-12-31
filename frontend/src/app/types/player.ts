import { PlayerStatus } from './playerStatus';
import { Icon } from './playerIcon';

export interface Player {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  money: number;
  status: PlayerStatus;
  icon: Icon;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreatePlayerDto {
  name: string;
  email: string;
  password: string;
  money: number;
  status: PlayerStatus;
  icon: Icon;
}

export interface UpdatePlayerDto {
  money?: number;
  status?: PlayerStatus;
}