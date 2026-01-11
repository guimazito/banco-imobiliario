import { TransactionType } from "./transactionType";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: TransactionType;
  playerIdPay: string;
  playerIdReceive: string;
  gameId: string;
  createdAt: string;
}

export interface CreateTransactionDto {
  amount: number;
  description: string;
  type: TransactionType;
  playerIdPay: string;
  playerIdReceive: string;
  gameId: string;
}
