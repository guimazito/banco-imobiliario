import React from "react";

export default function RankingList({ players }: { players: any[] }) {  

  return (
      <div
        style={{ userSelect: 'none' }}
      >
        <h2 className="text-lg font-bold text-white text-center">
          Ranking dos<br/>Jogadores
        </h2>
        <div
          // className="overflow-y-auto max-h-[67vh]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}
        >
          {[...players]
            .sort((a, b) => b.money - a.money)
            .map((player, index) => (
            <div key={player.id} className="mb-2 text-white bg-neutral-700 p-2 rounded text-lg text-center">            
              {/* {player.name}<br/>R$ {player.money} */}
              {player.name}<br/>R$ {new Intl.NumberFormat("pt-BR").format(player.money)}
            </div>
          ))}
        </div>
      </div>
  );
}