import 'dotenv/config';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import express, { json } from 'express';
import { connect, model, Schema } from 'mongoose';

const app = express();
const WS_BASE_URL = process.env.VITE_WS_BASE_URL;
const API_BASE_URL = process.env.VITE_API_BASE_URL;
const DB_BASE_URL = process.env.VITE_DB_BASE_URL;

console.log("API URL:", API_BASE_URL);
console.log("WebSocket URL:", WS_BASE_URL);
console.log("DB URL:", DB_BASE_URL);

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

// connection
    connect(`mongodb://${DB_BASE_URL}/playerdb`, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
});

// schemas
const playerSchema = new Schema({
    name: String,
    money: Number,
    status: String,
    icon: String
}, {versionKey: false});

const transactionSchema = new Schema({
    description: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

// models
const Player = model('Player', playerSchema);
const Transaction = model('Transaction', transactionSchema);

// websocket server
const wss = new WebSocketServer({ port: 3002 });

wss.on('connection', (ws) => {
    console.log('New client connected ' + Date.now());
    ws.on('error', console.error);

    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(message);
    });

    ws.on('close', () => {
        console.log('Client disconnected ' + Date.now());
    });

    ws.send(JSON.stringify({ event: 'Connected', message: 'Welcome to the WebSocket server!' }));
});

app.post('/api/players', async (req, res) => {
    const players = req.body;
    console.log('Received players:', players);
        
    if (!Array.isArray(players)) {
        return res.status(400).json({ messsage: 'Invalid data format. Expected an array of players.' });
    }

    try {
        await Player.insertMany(players);

        // emit event to websocket clients
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({ type: 'PLAYER_ADDED' }));
        });

        res.status(201).json({ message: 'Player created successfully' });
    } catch (error) {
        console.error('Error saving player:', error);
        res.status(500).json({ message: 'Error saving player', error });
    }
});

app.get('/api/players', async (req, res) => {
    const players = await Player.find();
    const formattedPlayers = players.
    map((player) => ({
            id: player._id,
            name: player.name,
            money: player.money,
            status: player.status,
            icon: player.icon
    }))
    .sort((a, b) => a.name.localeCompare(b.name));  
    res.status(200).json(formattedPlayers);
});

app.put('/api/players/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID do jogador a ser atualizado
    const { name, money, status } = req.body; // Obtém os dados do corpo da requisição

    try {
        // Atualiza o jogador no banco de dados
        const updatedPlayer = await Player.findByIdAndUpdate(
            id, // ID do jogador
            { name, money, status }, // Dados a serem atualizados
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Emite um evento para os clientes WebSocket
        wss.clients.forEach((client) => {
            if (client.readyState === 1) { // Verifica se o cliente está conectado
                client.send(JSON.stringify({ type: 'PLAYER_UPDATED', player: updatedPlayer }));
            }
        });

        res.status(200).json({ message: 'Player updated successfully', player: updatedPlayer });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({ message: 'Error updating player', error });
    }
});

app.delete('/api/players', async (req, res) => {
    try {
         await Player.deleteMany();
         res.status(200).json({ message: 'All players deleted successfully' });
    } catch (error) {
         console.error('Error deleting players:', error);
         res.status(500).json({ message: 'Error deleting players', error });
    }
 });

app.post('/api/transactions', async (req, res) => {
    const { description, type } = req.body;
    const transaction = new Transaction({ description, type });

    try {
        await transaction.save();

        // Emit event to websocket clients
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({ type: 'TRANSACTION_ADDED', transaction }));
            console.log('TRANSACTION_ADDED -> ', transaction);
        });

        res.status(201).json({ mensagem: 'Transação salva com sucesso!', transaction });

    } catch (error) {
        console.error('Error emitting event:', error);
        return res.status(500).json({ message: 'Error emitting event', error });
    }    
});

app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    const formattedTransactions = transactions.
    map((transaction) => ({
        id: transaction._id,
        description: transaction.description,
        type: transaction.type,
        createdAt: transaction.createdAt
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json(formattedTransactions);
});

app.delete('/api/transactions', async (req, res) => {
    try {
         await Transaction.deleteMany();
         res.status(200).json({ message: 'All transactions deleted successfully' });
    } catch (error) {
         console.error('Error deleting transactions:', error);
         res.status(500).json({ message: 'Error deleting transactions', error });
    }
 });

app.listen(3001, () => {
    console.log(`Server is running on ${API_BASE_URL}`);
});

/* Start the server
    node server.js */