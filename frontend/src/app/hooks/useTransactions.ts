import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    listTransactions,
    createTransaction,
    getTransactionsByGameId
} from "@/app/services/transactions";
import { CreateTransactionDto } from "@/app/types/transaction";

export function useListTransactions() {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: listTransactions,
    });
}

export function useGetTransactionsByGameId(gameId: string) {
    return useQuery({
        queryKey: ["transactions", gameId],
        queryFn: () => getTransactionsByGameId(gameId),
    });
}

export function useCreateTransaction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateTransactionDto) => createTransaction(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
    });
}
