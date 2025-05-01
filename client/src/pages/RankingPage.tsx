import React from 'react';
import type { Player } from '../types';
import { useLocation } from 'react-router-dom';
import { getRanking } from '../utils/rankingUtils';

export default function RankingPage() {
  const location = useLocation();
  const players = location.state as Player[]; // Recebe o estado via React Router

  const ranking = getRanking(players);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-white">Ranking dos Jogadores</h2>
      <ul className="mt-4">
        {ranking.filter((player) => player.title !== 'Banco').map((player, index) => (
          <li key={player.id} className="mb-2 text-white">
            {index + 1}. {player.title} - R$ {player.money}
          </li>
        ))}
      </ul>
    </div>
  );
}