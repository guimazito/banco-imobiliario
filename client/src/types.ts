export type PlayerStatus = 'idle' | 'pay' | 'receive';

export type TransactionType = 'betweenPlayers' | 'payToBank' | 'receiveFromBank';

export type Player = {
  id: string;
  name: string;
  money: number;
  status: PlayerStatus;
  icon: string;
};

export type Transaction = {
  id: string;
  description: string;
  type: TransactionType;
  createdAt: string;
};

export type PlayerCardProps = {
  player: Player;
  fetchPlayers: () => Promise<void>;
};