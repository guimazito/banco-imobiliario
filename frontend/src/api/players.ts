import { Player } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function updatePlayer(playerId: string, updatedData: Partial<Player>): Promise<Player | undefined> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/players/${playerId}`, {
        method: "PUT",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update player");
      }

      const updatedPlayer = await response.json();
      console.log("Player updated successfully:", updatedPlayer);

      return updatedPlayer;      

    } catch (error) {
      console.error("Error updating player:", error);
      return undefined;
    }
}

export async function fetchPlayers(): Promise<Player[]> {
    console.log('por dentro de players.ts')
    const response = await fetch(`${API_BASE_URL}:3001/api/players`);
    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }
    return response.json();
  }
  
  export async function deletePlayer(playerId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/players/${playerId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete player");
    }
  }