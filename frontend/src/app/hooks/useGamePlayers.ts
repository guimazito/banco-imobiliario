import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    listGamePlayers,
    createGamePlayer,
    updateGamePlayer,
    getGamePlayerId,
    getGamePlayerByGameId,
    getGamePlayerByPlayerId,
    getGamePlayerRankingByGameId
} from "@/app/services/gamePlayers";
import { GamePlayer } from "@/app/types/gamePlayers";

export function useListGamePlayers(gameId: string) {
    return useQuery({
        queryKey: ["gamePlayers", gameId],
        queryFn: () => listGamePlayers(gameId),
    });
}

export function useGetGamePlayerByGameId(gameId: string) {
    return useQuery({
        queryKey: ["gamePlayer", gameId],
        queryFn: () => getGamePlayerByGameId(gameId),
    });
}

export function useGetGamePlayerByPlayerId(playerId: string) {
    return useQuery({
        queryKey: ["gamePlayerByPlayer", playerId],
        queryFn: () => getGamePlayerByPlayerId(playerId),
    });
}

export function useGetGamePlayerId(gameId: string, playerId: string) {
    return useQuery({
        queryKey: ["gamePlayer", gameId, playerId],
        queryFn: () => getGamePlayerId(gameId, playerId),
    });
}

export function useGetGamePlayerRankingByGameId(gameId: string) {
    return useQuery({
        queryKey: ["gamePlayerRanking", gameId],
        queryFn: () => getGamePlayerRankingByGameId(gameId),
    });
}

export function useCreateGamePlayer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: Omit<GamePlayer, "id">) => createGamePlayer(payload),
        onSuccess: (_, payload) => {
            queryClient.invalidateQueries({ queryKey: ["gamePlayers", payload.gameId] });
        },
    });
}

export function useUpdateGamePlayer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            gameId,
            playerId,
            updatedData,
        }: {
            gameId: string;
            playerId: string;
            updatedData: Partial<GamePlayer>;
        }) => updateGamePlayer(gameId, playerId, updatedData),
        onSuccess: (_, { gameId }) => {
            queryClient.invalidateQueries({ queryKey: ["gamePlayers", gameId] });
        },
    });
}