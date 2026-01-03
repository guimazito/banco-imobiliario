"use client";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/navigation";
import React, { useState, JSX } from "react";
import PixIcon from "@mui/icons-material/Pix";
import { PlayerIcon } from "../types/playerIcon";
import { CreatePlayerDto } from "../types/player";
import FailAlert from "../components/FailedAlert";
import DialogTitle from "@mui/material/DialogTitle";
import SavingsIcon from "@mui/icons-material/Savings";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useCreatePlayer } from "@/app/hooks/usePlayers";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DialogContentText from "@mui/material/DialogContentText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import FlagCircleRoundedIcon from "@mui/icons-material/FlagCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

export default function NewGamePage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [money, setMoney] = useState<number>(0);
  // Player
  const { mutateAsync: createPlayer } = useCreatePlayer();
  const [players, setPlayers] = useState<{ username: string; icon: PlayerIcon }[]>([
    { username: "", icon: "ACCOUNT_CIRCLE" as PlayerIcon },
    { username: "", icon: "ACCOUNT_CIRCLE" as PlayerIcon },
  ]);
  // Alert
  const [failAlertOpen, setFailAlertOpen] = useState(false);
  const [failAlertMessage, setFailAlertMessage] = useState<string>("");
  // Avatar
  const iconMap: Record<PlayerIcon, JSX.Element> = {
    PIX: <PixIcon fontSize="large" color="primary" />,
    SAVINGS: <SavingsIcon fontSize="large" color="primary" />,
    CREDIT_CARD: <CreditCardIcon fontSize="large" color="primary" />,
    SHOPPING_BAG: <ShoppingBagIcon fontSize="large" color="primary" />,
    POINT_OF_SALE: <PointOfSaleIcon fontSize="large" color="primary" />,
    MONETIZATION: <MonetizationOnIcon fontSize="large" color="primary" />,
    ACCOUNT_CIRCLE: <AccountCircleIcon fontSize="large" />,
  };

  const iconArray: PlayerIcon[] = [
    "PIX",
    "SAVINGS",
    "CREDIT_CARD",
    "SHOPPING_BAG",
    "POINT_OF_SALE",
    "MONETIZATION",
  ];

  const [anchorEl, setAnchorEl] = useState<{
    index: number;
    element: HTMLElement | null;
  }>({ index: -1, element: null });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPlayer = () => {
    setPlayers((prevPlayers) => {
      if (prevPlayers.length >= 6) {
        setFailAlertMessage("Máximo de 6 jogadores atingido!");
        setFailAlertOpen(true);
        return prevPlayers;
      }
      return [
        ...prevPlayers,
        { username: "", icon: "ACCOUNT_CIRCLE" as PlayerIcon },
      ];
    });
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers((prevPlayers) => {
      if (prevPlayers.length <= 2) {
        setFailAlertMessage("Mínimo de 2 jogadores necessário!");
        setFailAlertOpen(true);
        return prevPlayers;
      }
      return prevPlayers.filter((_, i) => i !== index);
    });
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index ? { ...player, username: value } : player
      )
    );
  };

  const onSubmit = async (playerData: CreatePlayerDto) => {
    try {
      await createPlayer(playerData);
    } catch {
      setFailAlertMessage("Erro ao criar jogador!");
      setFailAlertOpen(true);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    for (const player of players) {
      await onSubmit({
        username: player.username.trim(),
        money: money.toString(),
        status: "IDLE",
        icon: player.icon,
      });
    }
    setOpen(false);
    router.push("/transaction");
  };

  const handleOpenAvatarMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setAnchorEl({ index, element: event.currentTarget });
  };

  const handleCloseAvatarMenu = () => {
    setAnchorEl({ index: -1, element: null });
  };

  const handleAvatarChange = (playerIndex: number, iconName: PlayerIcon) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === playerIndex ? { ...player, icon: iconName } : player
      )
    );
    setAnchorEl({ index: -1, element: null });
  };

  function handleMoneyChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value.replace(/\D/g, "");
    if (Number(event.target.value) < 0) {
      setFailAlertMessage("Valor não pode ser negativo!");
      setFailAlertOpen(true);
      setMoney(0);
    }
    setMoney(Number(rawValue));
  }

  function isCreateButtonEnabled() {
    const hasValidInput = money > 0;
    const hasTwoPlayers = players.length >= 2;
    const allNamesFilled = players.every((player) => player.username.trim() !== "");

    return hasValidInput && hasTwoPlayers && allNamesFilled;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pb: 8 }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <TextField
          label="Valor Inicial"
          variant="filled"
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            width: "90%",
            userSelect: "none",
            mb: 2,
          }}
          type="number"
          value={
            money === 0 ? "" : new Intl.NumberFormat("pt-BR").format(money)
          }
          onChange={handleMoneyChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />

        {players.map((player, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mt: 3, width: "90%" }}
          >
            <IconButton
              color="primary"
              onClick={(event) => handleOpenAvatarMenu(event, index)}
              sx={{ mr: 1 }}
            >
              {iconMap[player.icon]}
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl.element}
              open={anchorEl.index === index}
              onClose={handleCloseAvatarMenu}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 2,
                  padding: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                {iconArray.map((iconName, iconIndex) => (
                  <Box
                    key={iconIndex}
                    onClick={() => handleAvatarChange(index, iconName)}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {iconMap[iconName]}
                  </Box>
                ))}
              </Box>
            </Menu>

            <TextField
              label={`Jogador ${index + 1}`}
              variant="filled"
              sx={{ bgcolor: "white", borderRadius: 1, flex: 1, mr: 1 }}
              type="text"
              value={player.username}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            />
            <IconButton
              color="error"
              onClick={handleRemovePlayer.bind(null, index)}
            >
              <RemoveCircleRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
        ))}

        <FailAlert
          open={failAlertOpen}
          onClose={() => setFailAlertOpen(false)}
          message={failAlertMessage}
        ></FailAlert>
      </Box>

      <Box
        component="footer"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "grey.800",
          p: 2,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "95%",
          margin: "0 auto",
          zIndex: 1201,
        }}
      >
        <IconButton color="primary" onClick={handleAddPlayer}>
          <PersonAddAltRoundedIcon fontSize="large" />
        </IconButton>

        <Box>
          <IconButton
            color="success"
            onClick={handleClick}
            disabled={!isCreateButtonEnabled()}
            sx={{
              "&.Mui-disabled": {
                color: "rgba(52, 125, 54, 0.5)",
              },
            }}
          >
            <FlagCircleRoundedIcon fontSize="large" />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Deseja iniciar um novo jogo?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Todos os jogadores e transações da partida anterior serão
                apagados.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Não</Button>
              <Button onClick={handleSubmit} autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}
