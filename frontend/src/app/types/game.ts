import { GameStatus } from "./gameStatus";

export interface Game {
  id: string;
  invite: string;
  status: GameStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateGameDto {
  status: GameStatus;
}

export interface UpdateGameDto {
  invite: string;
  status: GameStatus;
}