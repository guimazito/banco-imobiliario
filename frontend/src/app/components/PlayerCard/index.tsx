"use client";

import Card from "@mui/material/Card";
import { Player } from "@/app/types/player";
import PixIcon from "@mui/icons-material/Pix";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export interface PlayerCardProps {
  player: Player;
  onCardClick: () => void | Promise<void>;
}

export function PlayerCard({ player, onCardClick }: PlayerCardProps) {
  const handleClick = async () => {
    await onCardClick();
  };

  const cardColorMap: { [key: string]: string } = {
    PAY: "#7f1d1d",
    RECEIVE: "#14532d",
    IDLE: "#404040",
  };

  const cardColor = cardColorMap[player.status] || "#404040";

  const cardAvatar = (name: string) => {
    switch (name) {
      case "PixIcon":
        return <PixIcon fontSize="large" />;
      case "SavingsIcon":
        return <SavingsIcon fontSize="large" />;
      case "CreditCardIcon":
        return <CreditCardIcon fontSize="large" />;
      case "PointOfSaleIcon":
        return <PointOfSaleIcon fontSize="large" />;
      case "MonetizationOnIcon":
        return <MonetizationOnIcon fontSize="large" />;
      case "ShoppingBagIcon":
        return <ShoppingBagIcon fontSize="large" />;
      default:
        return <AccountCircleIcon fontSize="large" />;
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        backgroundColor: cardColor,
        color: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        cursor: "pointer",
        userSelect: "none",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <div>
          <Typography variant="h6" component="div" sx={{ color: "#fff" }}>
            {player.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#e5e5e5", mt: 1 }}>
            R$ {new Intl.NumberFormat("pt-BR").format(player.money)}
          </Typography>
        </div>
        <div style={{ alignSelf: "flex-start" }}>{cardAvatar(player.icon)}</div>
      </CardContent>
    </Card>
  );
}
