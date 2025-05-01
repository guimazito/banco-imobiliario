import React from "react";
import Alert from '@mui/material/Alert';
import { PlayerCard } from '../PlayerCard';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import RankingList from "../components/RankingList";
import type { Player, Transaction } from '../types';
import NewGameButton from "../components/NewGameButton";
import FailAlert from '../components/FailAlert/FailAlert';
import TransactionList from "../components/TransactionList";
// import { updatePlayer, fetchPlayers } from "../api/players";
import { IconButton, TextField, InputAdornment } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [inputValue, setInputValue] = useState<number>(0);
  const [failAlertOpen, setFailAlertOpen] = useState(false);
  const [failAlertMessage, setFailAlertMessage] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // console.log("API URL:", API_BASE_URL);
  // console.log("WebSocket URL:", WS_BASE_URL);
  
  const fetchPlayers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/players`);
    const data = await response.json();
    setPlayers(data);
  };

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

      // Atualiza o estado local com os dados atualizados
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId ? { ...player, ...updatedData } : player
        )
      );
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const handleTransaction = async (description: string, type: string) => {
    await fetch(`${API_BASE_URL}/api/transactions`, {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: description, type: type })
    });
  };

  const fetchTransactions = async () => {
    const response = await fetch(`${API_BASE_URL}/api/transactions`);
    const data = await response.json();
    setTransactions(data);
    console.log("Transacionee:", transactions);
  };
  useEffect(() => {
    fetchPlayers();
    fetchTransactions();
    
    // Connect to WebSocket server
    // const ws = new WebSocket("ws://localhost:3002");
    const ws = new WebSocket(`${WS_BASE_URL}`);

    ws.onopen = () => {
        console.log("WebSocket connection established client");
        ws.send(JSON.stringify({ event: 'greeting', message: 'Hello server!' }));
    };
    
    ws.onmessage = (event) => {
        try {
            console.log("Event:", event);
            // console.log('Type:', typeof event.data);
            const message = JSON.parse(event.data)
            console.log("WebSocket mensagiiii:", message);
            console.log("Message type:", message.type);
            if (message.type === "TRANSACTION_ADDED") {
                // Fetch the updated list of players
                // console.log('message.player:', message.player);
                console.log('vai setTransaction:', message.transaction);
                fetchTransactions();
                fetchPlayers();
            }
        }catch (error) {
            console.error("Error parsing message:", error);
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
    
    ws.onclose = () => {
        console.log("WebSocket connection closed");
    };
    
    // // Clean up the WebSocket connection when the component unmounts
    return () => {
        ws.close();
        console.log("WebSocket connection closed client");
    };

  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = new Intl.NumberFormat("pt-BR").format(Number(rawValue)); // Formata o número
    setInputValue(Number(event.target.value));
    if (Number(event.target.value) < 0) {
      setFailAlertMessage('Valor não pode ser negativo!');
      setFailAlertOpen(true);
      setInputValue(0);
    }
    setInputValue(Number(rawValue));
  }

  function getPlayerReceiving() {
    return players.filter(
      (player) => player.status === 'receive'
    );
  }

  function getPlayerPaying() {
    return players.filter(
      (player) => player.status === 'pay'
    );
  }

  function isTransactionButtonEnabled() {
    const hasValidInput = inputValue > 0;
    const hasOneReceiving = getPlayerReceiving().length === 1;
    const hasOnePaying = getPlayerPaying().length === 1;
  
    if (hasValidInput && hasOneReceiving && hasOnePaying) {
      return true;
    }
  
    if (hasValidInput && hasOnePaying) {
      return true;
    }
  
    if (hasValidInput && hasOneReceiving) {
      return true;
    }
  
    return false;
  }

  function addMoneyToPlayer() {
    updatePlayer(players.filter((player) => player.status === 'receive')[0].id, {
      money: players.filter((player) => player.status === 'receive')[0].money + inputValue,
      status: 'idle'
    });
  }

  function removeMoneyToPlayer() {
    updatePlayer(players.filter((player) => player.status === 'pay')[0].id, {
      money: players.filter((player) => player.status === 'pay')[0].money - inputValue,
      status: 'idle'
    });
  }

  async function playersTransaction() {
    const hasOneReceiving = getPlayerReceiving().length === 1;
    const hasOnePaying = getPlayerPaying().length === 1;
    const won = players.filter(
      (player) => player.status === 'receive'
    );
    const lose = players.filter(
      (player) => player.status === 'pay'
    );
    let transactionDescription = "";
    let transactionType = "";

    if (hasOneReceiving && hasOnePaying) {
      addMoneyToPlayer();
      removeMoneyToPlayer();
      transactionDescription = (won.map((player) => player.name).join(', ')
      + ' ganhou R$ ' + new Intl.NumberFormat("pt-BR").format(inputValue) +
      ' de ' + lose.map((player) => player.name).join(', '));
      transactionType = 'betweenPlayers';
    } else if (hasOneReceiving) {
      addMoneyToPlayer();
      transactionDescription = (won.map((player) => player.name).join(', ')
      + ' ganhou R$ ' + new Intl.NumberFormat("pt-BR").format(inputValue) +
      ' do Banco');
      transactionType = 'receiveFromBank';
    } else if (hasOnePaying) {
      removeMoneyToPlayer();
      transactionDescription = (lose.map((player) => player.name).join(', ')
      + ' pagou R$ ' + new Intl.NumberFormat("pt-BR").format(inputValue)
      + ' para o Banco');
      transactionType = 'payToBank';
    }

    setInputValue(0);
    await handleTransaction(transactionDescription, transactionType);
    await fetchTransactions();
    await fetchPlayers();
    handleClick();
  }

  return (
    <div className="m-2">
      <div className="grid grid-cols-2">
        <div>
          <NewGameButton></NewGameButton>
        </div>
        <div className="mb-2">
          <div className="flex place-content-end gap-2">
            <TextField
              label="Valor"
              variant="filled"
              className="bg-white border rounded"
              style={{ width: '60%', userSelect: 'none'}}
              type="number"
              id="moneyInput"
              value={inputValue === 0 ? "" : new Intl.NumberFormat("pt-BR").format(inputValue)}
              onChange={handleInputChange}
              slotProps={{
                  input: {
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }
              }}
            />
            <IconButton
              color='primary'
              onClick={playersTransaction}
              disabled={!isTransactionButtonEnabled()}
            >
              <CheckCircleRoundedIcon fontSize="large"/>
            </IconButton>
            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Transação finalizada com sucesso!
              </Alert>
            </Snackbar>

            <FailAlert
              open={failAlertOpen}
              onClose={() => setFailAlertOpen(false)}
              message={failAlertMessage}
            ></FailAlert>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} fetchPlayers={fetchPlayers}/>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 h-full">
        <RankingList players={players}></RankingList>
        <TransactionList transactions={transactions}></TransactionList>  
      </div>
    </div>
  );
}