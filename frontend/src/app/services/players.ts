import { api } from "./api";
import { Player, CreatePlayerDto, UpdatePlayerDto } from "@/app/types/player";

export async function listPlayers(): Promise<Player[]> {
  const { data } = await api.get<Player[]>("/players");
  return data;
}

export async function getPlayerByUsername(username: string): Promise<Player | null> {
  const { data } = await api.get<Player>(`/players/username/${username}`);
  return data;
}

export async function createPlayer(payload: CreatePlayerDto): Promise<Player> {
  const { data } = await api.post<Player>("/players", payload);
  return data;
}

export async function updatePlayer(
  playerId: string,
  updatedData: Partial<UpdatePlayerDto>
): Promise<Player> {
  const { data } = await api.put<Player>(`/players/${playerId}`, updatedData);
  return data;
}
