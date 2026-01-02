"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Transaction } from "../../types/transaction";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";

export function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  const cardColor = (type: string) => {
    switch (type) {
      case "BETWEEN_PLAYERS":
        return "#854d0e";
      case "RECEIVE_FROM_BANK":
        return "#166534";
      case "PAY_TO_BANK":
        return "#991b1b";
      default:
        return "#374151";
    }
  };

  const cardIcon = (type: string) => {
    switch (type) {
      case "BETWEEN_PLAYERS":
        return <CompareArrowsOutlinedIcon fontSize="large" />;
      case "RECEIVE_FROM_BANK":
        return <TrendingUpIcon fontSize="large" />;
      case "PAY_TO_BANK":
        return <TrendingDownIcon fontSize="large" />;
      default:
        return <QuestionMarkOutlinedIcon fontSize="large" />;
    }
  };

  return (
    <Card
      sx={{
        userSelect: "none",
        background: "#ffffffff",
        color: "#000000ff",
        borderRadius: 2,
        boxShadow: 2,
        // width: "100%",
      }}
    >
      <CardContent sx={{ p: 0, m: 1 }}>
        <Typography variant="h6" align="center" fontWeight={700} gutterBottom>
          Últimas Transações
        </Typography>
        <Stack spacing={1} sx={{ maxHeight: "67vh", overflowY: "auto", pr: 1 }}>
          {transactions.map((transaction, index) => (
            <Card
              key={transaction.id || index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: cardColor(transaction.type),
                color: "#fff",
                borderRadius: 2,
                boxShadow: 1,
                p: 4,
                fontSize: "1.1rem",
              }}
              variant="outlined"
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {transaction.description}
              </Typography>
              {cardIcon(transaction.type)}
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
