import { api } from "./api"
import {
    GamePlayer,
    CreateGamePlayerDto,
    UpdateGamePlayerDto
} from "@/app/types/gamePlayers";

export async function listGamePlayers(gameId: string): Promise<GamePlayer[]> {
  const { data } = await api.get<GamePlayer[]>(`/game-players/${gameId}/players`);
  return data;
}

export async function getGamePlayerByGameId(gameId: string): Promise<GamePlayer | null> {
  const { data } = await api.get<GamePlayer>(`/game-players/game/${gameId}`);
  return data;
}

export async function getGamePlayerByPlayerId(playerId: string): Promise<GamePlayer[]> {
  const { data } = await api.get<GamePlayer[]>(`/game-players/player/${playerId}`);
  return data;
}

export async function getGamePlayerId(gameId: string, playerId: string): Promise<GamePlayer | null> {
  const { data } = await api.get<GamePlayer>(`/game-players/${gameId}/${playerId}`);
  return data;
}

export async function getGamePlayerRankingByGameId(gameId: string): Promise<GamePlayer[]> {
  const { data } = await api.get<GamePlayer[]>(`/game-players/ranking/${gameId}`);
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
  const { data } = await api.put<GamePlayer>(`/game-players/${gameId}/${playerId}`, updatedData);
  return data;
}