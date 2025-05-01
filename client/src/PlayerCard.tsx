import React from 'react';
import { Player } from './types';
import { PlayerCardProps } from './types';
import FaceIcon from '@mui/icons-material/Face';
// import { updatePlayer, fetchPlayers } from "./api/players";
import Avatar from '@mui/material/Avatar';


export function PlayerCard({ player, fetchPlayers }: PlayerCardProps) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const updatePlayer = async (playerId: string, updatedData: Partial<Player>) => {
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
      // console.log("Player updated successfully:", updatedPlayer);

    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const handleClick = async () => {
    try {
      await updatePlayer(
        player.id,
        { status: player.status === 'idle'
          ? 'pay'
          : player.status === 'pay'
          ? 'receive'
          : player.status === 'receive'
          ? 'idle'
          : 'idle'
      });
      await fetchPlayers();
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const cardColor = 
    player.status === 'pay'
    ? 'bg-red-900'
    : player.status === 'receive'
    ? 'bg-green-900'
    : 'bg-neutral-700';

  return (
    <div
      onClick={handleClick}
      className={`cursor-grab rounded-lg ${cardColor} p-4 shadow-sm hover:shadow-md`}
      style={{ userSelect: 'none' }}
    >
      <div className='flex items-center justify-between'>
        <div>
          <h3 className="font-medium text-lg text-neutral-100">{player.name}</h3>
          <p className="mt-2 text-lg text-neutral-400">R$ {new Intl.NumberFormat("pt-BR").format(player.money)}</p>
        </div>
        <div className='self-start'>
          {/* <FaceIcon></FaceIcon> */}
          <Avatar>H</Avatar>
        </div>
      </div>
    </div>
  );
}