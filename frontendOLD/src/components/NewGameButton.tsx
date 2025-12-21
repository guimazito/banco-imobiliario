import React from "react";
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';

export default function NewGameButton() {
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate('/new-game');
    };

    return (
        <div>
            <IconButton
                color='primary'
                onClick={handleOpen}
            >
                <FiberNewRoundedIcon fontSize="large"/>
            </IconButton>
        </div>
    );
}