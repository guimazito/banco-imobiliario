import { GameStatus } from "./gameStatus";

export interface Game {
  id: string;
  status: GameStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateGameDto {
  status: GameStatus;
}

export interface UpdateGameDto {
  status: GameStatus;
}