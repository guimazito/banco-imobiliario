import React from "react";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import PixIcon from '@mui/icons-material/Pix';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import SavingsIcon from '@mui/icons-material/Savings';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FailAlert from '../components/FailAlert/FailAlert';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DialogContentText from '@mui/material/DialogContentText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ResponsiveAppBar from "../components/ResponsiveAppBar";


export default function NewGame() {
    // Router
    const navigate = useNavigate();
    // Player
    const [open, setOpen] = useState(false);
    const [money, setMoney] = useState<number>(0);
    const [players, setPlayers] = useState([
        {name: "", icon: <AccountCircleIcon fontSize="large" name="AccountCircleIcon"/>},
        {name: "", icon: <AccountCircleIcon fontSize="large" name="AccountCircleIcon"/>},
    ]);
    // Alert
    const [failAlertOpen, setFailAlertOpen] = useState(false);
    const [failAlertMessage, setFailAlertMessage] = useState<string>('');
    // Enviroument
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // Avatar
    const iconArray = [
        <PixIcon fontSize="large" color="primary" name="PixIcon"/>,
        <SavingsIcon fontSize="large" color="primary" name="SavingsIcon"/>,
        <CreditCardIcon fontSize="large" color="primary" name="CreditCardIcon"/>,
        <ShoppingBagIcon fontSize="large" color="primary" name="ShoppingBagIcon"/>,
        <PointOfSaleIcon fontSize="large" color="primary" name="PointOfSaleIcon"/>,
        <MonetizationOnIcon fontSize="large" color="primary" name="MonetizationOnIcon"/>,
    ];
    const [anchorEl, setAnchorEl] = useState<{ index: number; element: HTMLElement | null }>({ index: -1, element: null });
    
    const handleClick = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddPlayer = () => {
        setPlayers((prevPlayers) => {
            if (prevPlayers.length >= 6) {
                setFailAlertMessage('Máximo de 6 jogadores atingido!');
                setFailAlertOpen(true);
                return prevPlayers;
            }
            return [...prevPlayers, { name: "" , icon: <AccountCircleIcon fontSize="large"/> }];
        });
    };

    const handleRemovePlayer = (index: number) => {
        setPlayers((prevPlayers) => {
            if (prevPlayers.length <=2) {
                setFailAlertMessage('Mínimo de 2 jogadores necessário!');
                setFailAlertOpen(true);
                return prevPlayers;
            }
            return prevPlayers.filter((_, i) => i !== index);
        });
    };

    const handlePlayerNameChange = (index: number, value: string) => {
        setPlayers((prevPlayers) => 
            prevPlayers.map((player, i) => 
                i === index ? { ...player, name: value } : player
            )
        );
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        await fetch(`${API_BASE_URL}/api/players`, {
            method: "DELETE",
        });
        console.log("Deletou os jogadores");

        await fetch(`${API_BASE_URL}/api/transactions`, {
            method: "DELETE",
        });
        console.log("Deletou as transações");
        console.log(players)
        await fetch(`${API_BASE_URL}/api/players`, {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(players.map(player => ({
                name: player.name.trim(),
                money: money,
                status: "idle",
                icon: player.icon.props.name
            }))),
        });

        navigate('/');
    };  
    
    const handleOpenAvatarMenu = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setAnchorEl({ index, element: event.currentTarget });
    };

    const handleCloseAvatarMenu = () => {
        setAnchorEl({ index: -1, element: null });
    };

    const handleAvatarChange = (playerIndex: number, icon: JSX.Element) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player, index) =>
                index === playerIndex ? { ...player, icon } : player
            )
        );
        setAnchorEl({ index: -1, element: null });
    };

    function handleMoneyChange(event: React.ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        const formattedValue = new Intl.NumberFormat("pt-BR").format(Number(rawValue));
        if (Number(event.target.value) < 0) {
            setFailAlertMessage('Valor não pode ser negativo!');
            setFailAlertOpen(true);
            setMoney(0);
        }    
        setMoney(Number(rawValue));
    }

    function isCreateButtonEnabled() {
        const hasValidInput = money > 0;
        const hasTwoPlayers = players.length >= 2;
        const allNamesFilled = players.every((player) => player.name.trim() !== "");
      
        return hasValidInput && hasTwoPlayers && allNamesFilled;
    }

    return (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <header className="flex place-content-between bg-gray-800 mb-5 p-2">
            <div>
                    <IconButton
                        color='primary'
                        onClick={handleAddPlayer}
                    >
                        <PersonAddAltRoundedIcon fontSize="large"/>
                    </IconButton>
                </div>

                <h1
                    className="text-3xl font-bold text-center mt-2"
                    style={{ userSelect: 'none' }}
                >
                    NOVO JOGO
                </h1>

                <div>
                    <IconButton
                        color='success'
                        onClick={handleClick}
                        disabled={!isCreateButtonEnabled()}
                    >
                        <FlagCircleRoundedIcon fontSize="large"/>
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
                            Todos os jogadores e transações da partida anterior serão apagados.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Não</Button>
                        <Button onClick={handleSubmit} autoFocus>
                            Sim
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </header>

            <form className="flex flex-col items-center">
                <TextField
                    label="Valor Inicial"
                    variant="filled"
                    className="bg-white border rounded"
                    style={{ width: '90%', userSelect: 'none'}}
                    type="number"
                    value={money === 0 ? "" : new Intl.NumberFormat("pt-BR").format(money)}
                    onChange={handleMoneyChange}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }
                    }}
                />

                {players.map((player, index) => (
                    <div className="flex mt-5" key={index}>
                        <IconButton
                            color='primary'
                            onClick={(event) => handleOpenAvatarMenu(event, index)}
                        >
                            {player.icon}
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl.element}
                            open={anchorEl.index === index}
                            onClose={handleCloseAvatarMenu}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: 2,
                                    padding: 2,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                }}
                            >
                               {iconArray.map((icon, iconIndex) => (
                                    <div
                                        key={iconIndex}
                                        onClick={() => handleAvatarChange(index, icon)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {icon}
                                    </div> 
                                ))}
                            </Box>
                        </Menu>

                        <TextField
                            label={`Jogador ${index + 1}`}
                            variant="filled"
                            className="bg-white border rounded"
                            type="text"
                            value={player.name}
                            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                            />
                        <IconButton
                            color='error'
                            onClick={handleRemovePlayer.bind(null, index)}
                        >
                            <RemoveCircleRoundedIcon fontSize="large"/>
                        </IconButton>
                    </div>
                ))}
    
                <FailAlert
                    open={failAlertOpen}
                    onClose={() => setFailAlertOpen(false)}
                    message={failAlertMessage}
                ></FailAlert>
            </form>            
        </div>
    );
}