"use client";

import React from "react";
import Alert from "@mui/material/Alert";
import { PlayerCard } from "../components/PlayerCard";
import { TransactionHistory } from "../components/TransactionHistory";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Player } from "../types/player";
import { Transaction } from "../types/transaction";
import { TransactionType } from "../types/transactionType";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  useListPlayers,
  useUpdatePlayer,
  useGetPlayerByName,
} from "@/app/hooks/usePlayers";
import {
  useListTransactions,
  useCreateTransaction,
} from "@/app/hooks/useTransactions";
// import RankingList from "../components/RankingList";
// import NewGameButton from "../components/NewGameButton";
// import FailAlert from '../components/FailAlert/FailAlert';
// import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function TransactionPage() {
  const [open, setOpen] = useState(false);
  // const [players, setPlayers] = useState<Player[]>([]);
  // const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;
  // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [inputValue, setInputValue] = useState<number>(0);
  const [failAlertOpen, setFailAlertOpen] = useState(false);
  const [failAlertMessage, setFailAlertMessage] = useState<string>("");
  const { data: getPlayerByName } = useGetPlayerByName("Bank");
  const { data: listTransactions } = useListTransactions();
  const [transactions, setTransactions] = useState<Transaction[]>(
    listTransactions ?? []
  );

  // console.log("API URL:", API_BASE_URL);
  // console.log("WebSocket URL:", WS_BASE_URL);

  const { data, refetch } = useListPlayers();
  const { mutateAsync: updatePlayerMutate } = useUpdatePlayer();
  const { mutateAsync: createTransactionMutate } = useCreateTransaction();

  const updatePlayer = async (
    playerId: string,
    updatedData: Partial<Player>
  ) => {
    try {
      await updatePlayerMutate({ playerId, updatedData });
      // const response = await fetch(`${API_BASE_URL}/api/players/${playerId}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(updatedData),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to update player");
      // }

      // const updatedPlayer = await response.json();
      // console.log("Player updated successfully:", updatedPlayer);

      // Atualiza o estado local com os dados atualizados

      // setPlayers((prevPlayers) =>
      //   prevPlayers.map((player) =>
      //     player.id === playerId ? { ...player, ...updatedData } : player
      //   )
      // );
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  // const handleTransaction = async (description: string, type: string) => {
  //   await fetch(`${API_BASE_URL}/api/transactions`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ description: description, type: type }),
  //   });
  // };

  const fetchTransactions = async () => {
    // const response = await fetch(`${API_BASE_URL}/api/transactions`);
    // const data = await response.json();
    // setTransactions(data);
    setTransactions(listTransactions ?? []);
    // console.log("Transacionee:", transactions);
  };

  useEffect(() => {
    setTransactions(listTransactions ?? []);
  }, [listTransactions]);

  // Connect to WebSocket server
  // const ws = new WebSocket("ws://localhost:3002");
  // const ws = new WebSocket(`${WS_BASE_URL}`);

  //   ws.onopen = () => {
  //       console.log("WebSocket connection established client");
  //       ws.send(JSON.stringify({ event: 'greeting', message: 'Hello server!' }));
  //   };

  //   ws.onmessage = (event) => {
  //       try {
  //           console.log("Event:", event);
  //           // console.log('Type:', typeof event.data);
  //           const message = JSON.parse(event.data)
  //           console.log("WebSocket mensagiiii:", message);
  //           console.log("Message type:", message.type);
  //           if (message.type === "TRANSACTION_ADDED") {
  //               // Fetch the updated list of players
  //               // console.log('message.player:', message.player);
  //               console.log('vai setTransaction:', message.transaction);
  //               fetchTransactions();
  //               fetchPlayers();
  //           }
  //       }catch (error) {
  //           console.error("Error parsing message:", error);
  //       }
  //   };

  //   ws.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //   };

  //   ws.onclose = () => {
  //       console.log("WebSocket connection closed");
  //   };

  //   // // Clean up the WebSocket connection when the component unmounts
  //   return () => {
  //       ws.close();
  //       console.log("WebSocket connection closed client");
  //   };

  // }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric
    const value = Number(rawValue);
    if (value < 0) {
      setFailAlertMessage("Valor não pode ser negativo!");
      setFailAlertOpen(true);
      setInputValue(0);
    } else {
      setInputValue(value);
    }
  }

  function getPlayerReceiving() {
    return (data ?? []).filter((player) => player.status === "RECEIVE");
  }

  function getPlayerPaying() {
    return (data ?? []).filter((player) => player.status === "PAY");
  }

  function isTransactionButtonEnabled() {
    const hasValidInput = inputValue > 0;
    const hasOneReceiving = getPlayerReceiving().length === 1;
    const hasOnePaying = getPlayerPaying().length === 1;
    const hasNoneReceiving = getPlayerReceiving().length === 0;
    const hasNonePaying = getPlayerPaying().length === 0;

    if (hasValidInput && hasOneReceiving && hasOnePaying) {
      return true;
    }

    if (hasValidInput && hasOnePaying && hasNoneReceiving) {
      return true;
    }

    if (hasValidInput && hasOneReceiving && hasNonePaying) {
      return true;
    }

    return false;
  }

  function addMoneyToPlayer() {
    const receiver = getPlayerReceiving()[0];
    if (receiver) {
      updatePlayer(receiver.id, {
        money: receiver.money + inputValue,
        status: "IDLE",
      });
    }
  }

  function removeMoneyToPlayer() {
    const payer = getPlayerPaying()[0];
    if (payer) {
      updatePlayer(payer.id, {
        money: payer.money - inputValue,
        status: "IDLE",
      });
    }
  }

  async function playersTransaction() {
    const hasOneReceiving = getPlayerReceiving().length === 1;
    const hasOnePaying = getPlayerPaying().length === 1;
    const won = getPlayerReceiving();
    const lose = getPlayerPaying();
    let transactionDescription = "";
    let transactionType: TransactionType = "BETWEEN_PLAYERS";

    if (hasOneReceiving && hasOnePaying) {
      addMoneyToPlayer();
      removeMoneyToPlayer();
      transactionDescription =
        won.map((player) => player.name).join(", ") +
        " ganhou R$ " +
        new Intl.NumberFormat("pt-BR").format(inputValue) +
        " de " +
        lose.map((player) => player.name).join(", ");
      transactionType = "BETWEEN_PLAYERS";
    } else if (hasOneReceiving) {
      addMoneyToPlayer();
      transactionDescription =
        won.map((player) => player.name).join(", ") +
        " ganhou R$ " +
        new Intl.NumberFormat("pt-BR").format(inputValue) +
        " do Banco";
      transactionType = "RECEIVE_FROM_BANK";
    } else if (hasOnePaying) {
      removeMoneyToPlayer();
      transactionDescription =
        lose.map((player) => player.name).join(", ") +
        " pagou R$ " +
        new Intl.NumberFormat("pt-BR").format(inputValue) +
        " para o Banco";
      transactionType = "PAY_TO_BANK";
    }

    setInputValue(0);
    // await handleTransaction(transactionDescription, transactionType);
    await createTransactionMutate({
      amount: inputValue,
      description: transactionDescription,
      type: transactionType,
      playerIdPay: hasOnePaying ? lose[0].id : getPlayerByName?.id ?? "",
      playerIdReceive: hasOneReceiving ? won[0].id : getPlayerByName?.id ?? "",
    });
    await fetchTransactions();
    // await fetchPlayers();
    handleClick();
  }

  return (
    <div>
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}

      <div className="m-2">
        <div className="mb-2">
          <div className="flex place-content-end gap-2">
            <TextField
              label="Valor"
              variant="filled"
              className="bg-white border rounded"
              style={{ width: "100%", userSelect: "none" }}
              type="number"
              id="moneyInput"
              value={
                inputValue === 0
                  ? ""
                  : new Intl.NumberFormat("pt-BR").format(inputValue)
              }
              onChange={handleInputChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={playersTransaction}
              disabled={!isTransactionButtonEnabled()}
              sx={{
                "&.Mui-disabled": {
                  color: "rgba(25, 121, 206, 0.5)",
                },
              }}
            >
              <CheckCircleRoundedIcon fontSize="large" />
            </IconButton>
            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                Transação finalizada com sucesso!
              </Alert>
            </Snackbar>

            {/* <FailAlert
              open={failAlertOpen}
              onClose={() => setFailAlertOpen(false)}
              message={failAlertMessage}
            ></FailAlert> */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(data ?? [])
            .filter((player) => player.name !== "Bank")
            .map((player) => {
              const playerStatus = (status: string) => {
                if (status === "IDLE") return "PAY";
                if (status === "PAY") return "RECEIVE";
                if (status === "RECEIVE") return "IDLE";
                return "IDLE";
              };
              const handleCardClick = async () => {
                await updatePlayer(player.id, {
                  status: playerStatus(player.status),
                });
                await refetch();
              };
              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 h-full">
          {/* <RankingList players={players}></RankingList> */}
          <TransactionHistory transactions={transactions}></TransactionHistory>
        </div>
      </div>
    </div>
  );
}
