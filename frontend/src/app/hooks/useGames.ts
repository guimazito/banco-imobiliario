import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    listGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} from "@/app/services/games";
import { CreateGameDto, UpdateGameDto } from "@/app/types/game";

export function useListGames() {
    return useQuery({
        queryKey: ["games"],
        queryFn: listGames,
    });
}

export function useGetGameById(gameId: string) {
    return useQuery({
        queryKey: ["game", gameId],
        queryFn: () => getGameById(gameId),
    });
}

export function useCreateGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateGameDto) => createGame(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["games"] });
        },
    });
}

export function useUpdateGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            gameId,
            updatedData,
        }: {
            gameId: string;
            updatedData: Partial<UpdateGameDto>;
        }) => updateGame(gameId, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["games"] });
        },
    });
}

export function useDeleteGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (gameId: string) => deleteGame(gameId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["games"] });
        },
    });
}