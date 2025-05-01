import React from "react";
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FailAlert from '../components/FailAlert/FailAlert';
import DialogContentText from '@mui/material/DialogContentText';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

export default function NewGame() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [money, setMoney] = useState<number>(0);
    const [players, setPlayers] = useState([{name: ""}]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [failAlertOpen, setFailAlertOpen] = useState(false);
    const [failAlertMessage, setFailAlertMessage] = useState<string>('');

    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleAddPlayer = () => {
        setPlayers((prevPlayers) => [...prevPlayers, { name: "" }]);        
    };

    const handleRemovePlayer = (index: number) => {
        setPlayers((prevPlayers) =>
            prevPlayers.filter((_, i) => i !== index))
    };

    const handlePlayerNameChange = (index: number, value: string) => {
        setPlayers((prevPlayers) => 
            prevPlayers.map((player, i) => 
                i === index ? { ...player, name: value } : player
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`${API_BASE_URL}/api/players`, {
            method: "DELETE",
        });
        console.log("Deletou os jogadores");

        await fetch(`${API_BASE_URL}/api/transactions`, {
            method: "DELETE",
        });
        console.log("Deletou as transações");

        await fetch(`${API_BASE_URL}/api/players`, {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(players.map(player => ({ name: player.name.trim(), money: money, status: "idle" }))),
        });

        navigate('/');
    };

    function handleMoneyChange(event: React.ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        const formattedValue = new Intl.NumberFormat("pt-BR").format(Number(rawValue)); // Formata o número
        if (Number(event.target.value) < 0) {
            setFailAlertMessage('Valor não pode ser negativo!');
            setFailAlertOpen(true);
            setMoney(0);
        }    
        setMoney(Number(rawValue)); // Atualiza o estado com o valor numérico
    }

    function isCreateButtonEnabled() {
        const hasValidInput = money > 0;
        const hasTwoPlayers = players.length >= 2;
        const allNamesFilled = players.every((player) => player.name.trim() !== "");
      
        return hasValidInput && hasTwoPlayers && allNamesFilled;
    }

    return (
        <div>
            <header className="flex place-content-between bg-gray-700 mb-5 p-2">
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

                {/* <Snackbar
                    open={open}
                    autoHideDuration={1500}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                > */}
                    {/* <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Transação finalizada com sucesso!
                    </Alert> */}
                {/* </Snackbar> */}
    
                <FailAlert
                    open={failAlertOpen}
                    onClose={() => setFailAlertOpen(false)}
                    message={failAlertMessage}
                ></FailAlert>
            </form>            
        </div>
    );

}