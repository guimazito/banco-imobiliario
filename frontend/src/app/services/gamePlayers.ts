import { api } from "./api"
import {
    GamePlayer,
    CreateGamePlayerDto,
    UpdateGamePlayerDto
} from "@/app/types/gamePlayers";

export async function listGamePlayers(gameId: string): Promise<GamePlayer[]> {
  const { data } = await api.get<GamePlayer[]>(`/games/${gameId}/players`);
  return data;
}

export async function getGamePlayerById(gameId: string, playerId: string): Promise<GamePlayer | null> {
  const { data } = await api.get<GamePlayer>(`/games/${gameId}/players/${playerId}`);
  return data;
}

export async function createGamePlayer(payload: CreateGamePlayerDto): Promise<GamePlayer> {
  const { data } = await api.post<GamePlayer>("/game-players", payload);
  return data;
}

export async function updateGamePlayer(
  gameId: string,
  playerId: string,
  updatedData: Partial<UpdateGamePlayerDto>
): Promise<GamePlayer> {
  const { data } = await api.put<GamePlayer>(`/games/${gameId}/players/${playerId}`, updatedData);
  return data;
}