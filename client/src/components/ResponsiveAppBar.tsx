import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
  }

export default function ResponsiveAppBar(props: Props) {  
    const drawerWidth = 240;
    const navItems = ['Home', 'Novo Jogo', 'Propriedades', 'Balanço Final'];
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        console.log("handleDrawerToggle");
        setMobileOpen((prevState) => !prevState);
    };
    const navigate = useNavigate();
    
    const handleNavigation = (item: string) => {
        if (item === 'Home') {
            navigate('/');
        } else if (item === 'Novo Jogo') {
            navigate('/new-game');
        }
        // } else if (item === 'Propriedades') {
        //     navigate('/properties');
        // } else if (item === 'Balanço Final') {
        //     navigate('/final-balance');
    };

    const drawer = (
    <Box
        className="bg-grayscale-800 text-white"
        onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}
    >
        <Typography variant="h6" sx={{ my: 2, userSelect: 'none' }}>
        Banco Imobiliário App
        </Typography>
        <Divider sx={{ backgroundColor: 'gray' }}/>
        <List>
        {navItems.map((item) => (
            <ListItem
                key={item}
                disablePadding
                onClick={() => {
                    handleNavigation(item);
                }}
            >
            <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
            </ListItemButton>
            </ListItem>
        ))}
        </List>
    </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box 
            className="bg-grayscale-800 text-white"
            sx={{ display: 'flex' }}
        >
            <AppBar component="nav" sx={{ backgroundColor: '#1c45ab' }}>
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
                >
                <MenuIcon />
                </IconButton>
                <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', userSelect: 'none' } }}
                >
                Banco Imobiliário App
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                    <Button 
                        key={item}
                        sx={{ color: '#fff' }}
                        onClick={() => {
                            handleNavigation(item);
                        }}
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
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#1a1a1a'},   
                }}
            >
                {drawer}
            </Drawer>
            </nav>
            <Box component="main">
            <Toolbar />
            </Box>
        </Box>
    );
}