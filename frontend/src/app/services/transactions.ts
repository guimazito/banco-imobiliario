import { api } from "./api";
import { Transaction, CreateTransactionDto } from "@/app/types/transaction";

export async function listTransactions(): Promise<Transaction[]> {
  const { data } = await api.get<Transaction[]>("/transactions");
  return data;
}

export async function createTransaction(
  payload: CreateTransactionDto
): Promise<Transaction> {
  const { data } = await api.post<Transaction>("/transactions", payload);
  return data;
}

export async function getTransactionById(
  transactionId: string
): Promise<Transaction> {
  const { data } = await api.get<Transaction>(`/transactions/${transactionId}`);
  return data;
}
