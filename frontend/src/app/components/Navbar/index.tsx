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
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { useRouter, usePathname } from "next/navigation";
import ListItemButton from "@mui/material/ListItemButton";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export function Navbar(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const drawerWidth = 240;
  const navItems = [/*"Novo Jogo", */"Transações", "Propriedades", "Balanço Final"];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigation = (item: string) => {
    if (item === "Transações") {
      router.push("/transaction");
    // } else if (item === "Novo Jogo") {
    //   router.push("/new-game");
    } else if (item === "Propriedades") {
      router.push("/properties");
    } else if (item === "Balanço Final") {
      router.push("/final-balance");
    }
  };

  const getPageTitle = () => {
    switch (pathname) {
      case "/transaction":
        return "TRANSAÇÕES";
      // case "/new-game":
      //   return "NOVO JOGO";
      case "/properties":
        return "PROPRIEDADES";
      case "/final-balance":
        return "BALANÇO FINAL";
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
        height: "100%",
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
              flexGrow: 1,
              textAlign: "center",
              display: { xs: "block", sm: "none" },
              userSelect: "none",
              letterSpacing: 1,
            }}
          >
            {getPageTitle()}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              userSelect: "none",
              letterSpacing: 1,
            }}
          >
            Banco Imobiliário App
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
              >
                {item}
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
