export interface PlayerProfile {
  id: string;
  profileName: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface CreatePlayerProfileDto {
  profileName: string;
  description?: string;
}

export interface UpdatePlayerProfileDto {
  profileName?: string;
  description?: string;
}
