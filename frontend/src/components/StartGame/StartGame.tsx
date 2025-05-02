import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { IconButton, TextField } from '@mui/material';
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const [inputTotalPlayers, setTotalPlayers] = useState<number>(0);
  const [transactionMessage, setTransactionMessage] = useState<string>('');
  const [players, setPlayers] = useState<string[]>([]); // Array para armazenar os jogadores
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleTotalPlayersChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setTransactionMessage(event.target.value + ' jogadores serão criados');
    setTotalPlayers(Number(event.target.value));

    // Atualiza o array de jogadores com base no número de jogadores
    setPlayers(Array(event.target.value).fill(''));
  }

  function handlePlayerNameChange(index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const updatedPlayers = [...players];
      updatedPlayers[index] = event.target.value; // Atualiza o nome do jogador no índice correspondente
      setPlayers(updatedPlayers);
    }

  return (
    <React.Fragment>
      <TextField
        label="Informe a quantidade de jogadores"
        variant="outlined"
        type="number"
        style={{ width: '300px'}}
        value={inputTotalPlayers === 0 ? "" : inputTotalPlayers}
        onChange={handleTotalPlayersChange}
      >oi</TextField>
      <Button onClick={handleOpen}>Criar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, color: 'black' }}>
          <p id="child-modal-description">{transactionMessage}</p>
          {/* Renderiza os TextFields dinamicamente */}
          {players.map((player, index) => (
            <TextField
              key={index}
              label={`Jogador ${index + 1}`}
              variant="outlined"
              type="text"
              style={{ width: '300px', marginBottom: '10px' }}
              value={player}
              onChange={(event) => handlePlayerNameChange(index, event)}
            />
          ))}
          <Button onClick={handleClose}>Fechar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        color='primary'
        onClick={handleOpen}
      >
        <FiberNewRoundedIcon fontSize="large"/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, color: 'black' }}>
          {/* <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p> */}
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}