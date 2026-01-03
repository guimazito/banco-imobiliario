"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useGetPlayerRanking } from "@/app/hooks/usePlayers";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export function RankingList() {
  const { data: ranking } = useGetPlayerRanking();

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Paper
        elevation={4}
        sx={{ width: 360, p: 3, bgcolor: "background.paper" }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
          Ranking dos Jogadores
        </Typography>
        <List>
          {ranking &&
            ranking
              .filter((player) => player.username !== "Bank")
              .map((player, index) => (
                <ListItem
                  key={player.id}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    bgcolor:
                      index === 0 ? "primary.light" : "background.default",
                    color:
                      index === 0 ? "primary.contrastText" : "text.primary",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: index === 0 ? "gold" : "grey.300",
                        color: index === 0 ? "orange" : "grey.800",
                      }}
                    >
                      {index === 0 ? <EmojiEventsIcon /> : index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight={index === 0 ? "bold" : "normal"}>
                        {player.username}
                      </Typography>
                    }
                    secondary={`R$ ${player.money}`}
                  />
                </ListItem>
              ))}
        </List>
      </Paper>
    </Box>
  );
}
