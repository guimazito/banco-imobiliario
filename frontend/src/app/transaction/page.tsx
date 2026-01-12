"use client";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Navbar } from "../components/Navbar";
import { GamePlayer } from "../types/gamePlayers";
import FailAlert from "../components/FailedAlert";
import React, { useState, useEffect } from "react";
import { PlayerCard } from "../components/PlayerCard";
import { useGetGameById } from "@/app/hooks/useGames";
import { useGameId } from "@/app/contexts/GameContext";
import { RankingList } from "../components/RankingList";
import { TransactionType } from "../types/transactionType";
import { useWebSocket } from "../contexts/WebSocketContext";
import { useGetPlayerByUsername } from "@/app/hooks/usePlayers";
import { useGetGamePlayerByGameId } from "@/app/hooks/useGamePlayers";
import { TransactionHistory } from "../components/TransactionHistory";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  useCreateTransaction,
  useGetTransactionsByGameId,
} from "@/app/hooks/useTransactions";
import {
  useUpdateGamePlayer,
  useGetGamePlayerRankingByGameId,
} from "@/app/hooks/useGamePlayers";
import {
  IconButton,
  TextField,
  InputAdornment,
  Container,
  Box,
  Paper,
  Grid,
} from "@mui/material";

export default function TransactionPage() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const [failAlertOpen, setFailAlertOpen] = useState(false);
  const [failAlertMessage, setFailAlertMessage] = useState<string>("");
  const { ws } = useWebSocket();
  const { gameId } = useGameId();
  const { data: getPlayerByName } = useGetPlayerByUsername("Bank");
  const { data: code } = useGetGameById(gameId ?? "");  
  const { data: listPlayers, refetch: refetchPlayers } =
    useGetGamePlayerByGameId(gameId!);
  const { data: listTransactions, refetch: refetchTransactions } =
    useGetTransactionsByGameId(gameId!);
  const { mutateAsync: updateGamePlayerMutate } = useUpdateGamePlayer();
  const { mutateAsync: createTransactionMutate } = useCreateTransaction();
  const { refetch: refetchRanking } = useGetGamePlayerRankingByGameId(gameId!);

  const updateGamePlayer = async (
    gameId: string,
    playerId: string,
    updatedData: Partial<GamePlayer>
  ) => {
    try {
      await updateGamePlayerMutate({ gameId, playerId, updatedData });
    } catch (error) {
      console.error("Error updating game player:", error);
    }
  };

  useEffect(() => {
    if (!ws) return;

    const handleMessage = async (event: MessageEvent) => {
      try {
        let messageData = event.data;
        if (messageData instanceof Blob) {
          messageData = await messageData.text();
        }
        const message = JSON.parse(messageData);
        console.log("WebSocket message received:", message);
        if (message.type === "PLAYER_UPDATED") {
          await refetchPlayers();
        }
        if (message.type === "TRANSACTION_ADDED") {
          await refetchTransactions();
          await refetchPlayers();
          await refetchRanking();
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.addEventListener("message", handleMessage);
    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, refetchPlayers, refetchTransactions, refetchRanking]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value.replace(/\D/g, "");
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
    if (!Array.isArray(listPlayers)) return [];
    return listPlayers.filter(
      (player: GamePlayer) => player.playerStatus === "RECEIVE"
    );
  }

  function getPlayerPaying() {
    if (!Array.isArray(listPlayers)) return [];
    return listPlayers.filter(
      (player: GamePlayer) => player.playerStatus === "PAY"
    );
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
    if (receiver && gameId) {
      updateGamePlayer(gameId, receiver.playerId, {
        playerMoney: receiver.playerMoney + inputValue,
        playerStatus: "IDLE",
      });
    }
  }

  function removeMoneyToPlayer() {
    const payer = getPlayerPaying()[0];
    if (payer && gameId) {
      updateGamePlayer(gameId, payer.playerId, {
        playerMoney: payer.playerMoney - inputValue,
        playerStatus: "IDLE",
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
        won.map((player) => player.player.username).join(", ") +
        " ganhou R$ " +
        new Intl.NumberFormat("pt-BR").format(inputValue) +
        " de " +
        lose.map((player) => player.player.username).join(", ");
      transactionType = "BETWEEN_PLAYERS";
    } else if (hasOneReceiving) {
      addMoneyToPlayer();
      transactionDescription =
        won.map((player) => player.player.username).join(", ") +
        " ganhou R$ " +
        new Intl.NumberFormat("pt-BR").format(inputValue) +
        " do Banco";
      transactionType = "RECEIVE_FROM_BANK";
    } else if (hasOnePaying) {
      removeMoneyToPlayer();
      transactionDescription =
        lose.map((player) => player.player.username).join(", ") +
        " pagou R$ " +
        new Intl.NumberFormat("pt-BR").format(inputValue) +
        " para o Banco";
      transactionType = "PAY_TO_BANK";
    }

    setInputValue(0);
    const playerIdPay = hasOnePaying
      ? lose[0].playerId
      : getPlayerByName?.id ?? "";
    const playerIdReceive = hasOneReceiving
      ? won[0].playerId
      : getPlayerByName?.id ?? "";
    await createTransactionMutate({
      amount: inputValue,
      description: transactionDescription,
      type: transactionType,
      playerIdPay: playerIdPay,
      playerIdReceive: playerIdReceive,
      gameId: gameId!,
    });
    handleClick();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "TRANSACTION_ADDED",
          playerIdPay: playerIdPay,
          playerIdReceive: playerIdReceive,
        })
      );
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Navbar
        inviteCode={code?.invite ?? undefined}
        gameId={gameId}
      />
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label="Valor"
            variant="filled"
            fullWidth
            type="number"
            id="moneyInput"
            value={inputValue === 0 ? "" : inputValue}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
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
        </Box>
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
        <FailAlert
          open={failAlertOpen}
          onClose={() => setFailAlertOpen(false)}
          message={failAlertMessage}
        ></FailAlert>
      </Paper>
      <Grid container columns={12} columnSpacing={2} mb={3}>
        {Array.isArray(listPlayers) &&
          listPlayers.length > 0 &&
          listPlayers
            .filter((player) => player.player.username !== "Bank")
            .map((player) => {
              const playerStatus = (playerStatus: string) => {
                if (playerStatus === "IDLE") return "PAY";
                if (playerStatus === "PAY") return "RECEIVE";
                if (playerStatus === "RECEIVE") return "IDLE";
                return "IDLE";
              };
              const handleCardClick = async () => {
                if (!gameId) return;
                await updateGamePlayer(gameId, player.playerId, {
                  playerStatus: playerStatus(player.playerStatus),
                });
                if (ws && ws.readyState === WebSocket.OPEN) {
                  ws.send(
                    JSON.stringify({
                      type: "PLAYER_UPDATED",
                      playerId: player.playerId,
                    })
                  );
                }
              };
              return (
                <Grid key={player.playerId} sx={{ width: "100%" }}>
                  <PlayerCard player={player} onCardClick={handleCardClick} />
                </Grid>
              );
            })}
      </Grid>
      <TransactionHistory transactions={listTransactions ?? []} />
      <RankingList gameId={gameId ?? ""} />
    </Container>
  );
}
