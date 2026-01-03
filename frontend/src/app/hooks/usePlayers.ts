import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listPlayers,
  createPlayer,
  updatePlayer,
  getPlayerByUsername,
  getPlayerRanking,
} from "@/app/services/players";
import { CreatePlayerDto, UpdatePlayerDto } from "@/app/types/player";

export function useListPlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: listPlayers,
  });
}

export function useGetPlayerByUsername(username: string) {
  return useQuery({
    queryKey: ["player", username],
    queryFn: () => getPlayerByUsername(username),
  });
}

export function useGetPlayerRanking() {
  return useQuery({
    queryKey: ["playerRanking"],
    queryFn: getPlayerRanking,
  });
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlayerDto) => createPlayer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      playerId,
      updatedData,
    }: {
      playerId: string;
      updatedData: Partial<UpdatePlayerDto>;
    }) => updatePlayer(playerId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}
