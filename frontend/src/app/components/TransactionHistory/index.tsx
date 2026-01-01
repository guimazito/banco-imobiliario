"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TransactionHistory({ transactions }: { transactions: any[] }) {
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
        background: "#222",
        color: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        p: 1,
        mx: 0.5,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" align="center" fontWeight={700} gutterBottom>
          Últimas
          <br />
          Transações
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
                p: 1,
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
