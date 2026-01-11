export interface Player {
  id: string;
  username: string;
  password: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreatePlayerDto {
  username: string;
  profileId: string;
}

export interface UpdatePlayerDto {
  username: string;
  profileId: string;
}
