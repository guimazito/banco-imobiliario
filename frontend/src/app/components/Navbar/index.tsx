"use client";

import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useLogout } from "@/app/hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { useGameId } from "@/app/contexts/GameContext";
import { useRouter, usePathname } from "next/navigation";
import ListItemButton from "@mui/material/ListItemButton";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  inviteCode?: string;
  gameId?: string;
}

export function Navbar(props: Props) {
  const router = useRouter();
  const { gameId, setGameId } = useGameId();
  const pathname = usePathname();
  const drawerWidth = 240;
  let navItems: string[];
  if ((pathname === "/home") || (pathname === "/about") || (pathname === "/contact")) {
    navItems = ["Home", "Sobre", "Contato", "Sair"];
  } else {
    navItems = ["Home", "Transações", "Propriedades", "Balanço Final"];
  }
  const { window, inviteCode } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const { mutateAsync: doLogout, isPending } = useLogout();

  const handleLogout = async () => {
    setGameId("");
    await doLogout();
    router.push('/');
  };

  const handleNavigation = (item: string) => {
    if (item === "Home") {
      router.push("/home");
    } else if (item === "Transações") {
      router.push(`/game/${gameId}/transaction`);
    } else if (item === "Propriedades") {
      router.push(`/game/${gameId}/properties`);
    } else if (item === "Balanço Final") {
      router.push(`/game/${gameId}/final-balance`);
    } else if (item === "Sair") {
      handleLogout();
    } else if (item === "Sobre") {
      router.push("/about");
    } else if (item === "Contato") {
      router.push("/contact");
    }
  };

  const getPageTitle = () => {
    switch (pathname) {
      case `/game/${gameId}/transaction`:
        return "TRANSAÇÕES";
      case `/game/${gameId}/properties`:
        return "PROPRIEDADES";
      case `/game/${gameId}/final-balance`:
        return "BALANÇO FINAL";
      case "/about":
        return "SOBRE";
      case "/contact":
        return "CONTATO";
      case "/home":
        return "HOME";
      default:
        return "BANCO IMOBILIÁRIO APP";
    }
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: "primary.dark",
        color: "#fff",
        height: "100vh",
        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        sx={{ my: 2, userSelect: "none", letterSpacing: 1 }}
      >
        Banco Imobiliário App
      </Typography>
      <Divider sx={{ backgroundColor: "#2d2d2d" }} />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            onClick={() => handleNavigation(item)}
            sx={{
              "&:hover": { bgcolor: "primary.light", color: "#fff" },
              transition: "background 0.2s",
            }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {inviteCode && (
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Divider sx={{ backgroundColor: "#2d2d2d", mb: 1 }} />
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              fontWeight: 500,
              letterSpacing: 1,
              userSelect: "all",
              width: "100%",
              textAlign: "center",
            }}
          >
            Convite: {inviteCode}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar
        component="nav"
        position="fixed"
        sx={{ bgcolor: "primary.main", boxShadow: 3 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              userSelect: "none",
              letterSpacing: 1,
              minWidth: 180,
              textAlign: "left",
              ml: 2,
              display: { xs: "block", sm: "block" },
            }}
          >
            {getPageTitle()}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              userSelect: "none",
              letterSpacing: 1,
            }}
          >
            Banco Imobiliário App
            {inviteCode && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "#ffd700",
                  background: "rgba(0,0,0,0.08)",
                  px: 1.5,
                  borderRadius: 2,
                  verticalAlign: "middle",
                  display: "inline",
                }}
              >
                Convite: {inviteCode}
              </Typography>
            )}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  mx: 1,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "primary.light" },
                }}
                onClick={() => handleNavigation(item)}
                disabled={item === "Sair" && isPending}
              >
                {item === "Sair" && isPending ? "Saindo..." : item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "primary.dark",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
