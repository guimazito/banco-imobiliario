import { api } from "./api"
import { Game, CreateGameDto, UpdateGameDto } from "@/app/types/game";

export async function listGames(): Promise<Game[]> {
  const { data } = await api.get<Game[]>("/games");
  return data;
}

export async function getGameById(gameId: string): Promise<Game | null> {
  const { data } = await api.get<Game>(`/games/${gameId}`);
  return data;
}

export async function createGame(payload: CreateGameDto): Promise<Game> {
  const { data } = await api.post<Game>("/games", payload);
  return data;
}

export async function updateGame(
  gameId: string,
  updatedData: Partial<UpdateGameDto>
): Promise<Game> {
  const { data } = await api.put<Game>(`/games/${gameId}`, updatedData);
  return data;
}

export async function deleteGame(gameId: string): Promise<void> {
  await api.delete(`/games/${gameId}`);
}