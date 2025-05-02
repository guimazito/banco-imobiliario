import React from 'react';
import { Player } from './types';
import { PlayerCardProps } from './types';
import PixIcon from '@mui/icons-material/Pix';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import { updatePlayer, fetchPlayers } from "./api/players";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


export function PlayerCard({ player, fetchPlayers }: PlayerCardProps) {
  // Environment
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Player
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

  const cardColorMap: { [key: string]: string } = {
    pay: 'bg-red-900',
    receive: 'bg-green-900',
    idle: 'bg-neutral-700',
  };

  const cardColor = cardColorMap[player.status] || 'bg-neutral-700';

  const cardAvatar = (name: string) => {
    switch (name) {
      case 'PixIcon':
        return <PixIcon fontSize="large" />;
      case 'SavingsIcon':
        return <SavingsIcon fontSize="large" />;
      case 'CreditCardIcon':
        return <CreditCardIcon fontSize="large" />;
      case 'PointOfSaleIcon':
        return <PointOfSaleIcon fontSize="large" />;
      case 'MonetizationOnIcon':
        return <MonetizationOnIcon fontSize="large" />;
      case 'ShoppingBagIcon':
        return <ShoppingBagIcon fontSize="large" />;
      default:
        return <AccountCircleIcon fontSize="large" />;
    }
  }

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
          {cardAvatar(player.icon)}
        </div>
      </div>
    </div>
  );
}