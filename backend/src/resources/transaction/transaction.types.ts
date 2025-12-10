import { Transaction } from '@prisma/client';

export type CreateTransactionDto = Pick<
    Transaction,
    | 'amount'
    | 'description'
    | 'type'
    | 'playerIdPay'
    | 'playerIdReceive'
>;