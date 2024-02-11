const { createServer } = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const httpserver = createServer();
let countUser = 0;
let players = [];
let lobbies = [];
let quests = [];
let round = 0;

const io = new Server(httpserver, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    socket.on('find', (e) => {
        if (e.name != null) {
            players.push(e.name);
            if (players.length == 2) {

                let player1 = {
                    name: players[0],
                    score: 0
                }

                let player2 = {
                    name: players[1],
                    score: 0
                }

                let lobby = {
                    players: [player1, player2]
                }

                lobbies.push(lobby);

                axios.get('https://opentdb.com/api.php?amount=11&type=multiple')
                    .then(response => {
                        quests = response.data;
                        io.emit('find', { lobbies: lobbies, quests: quests, final: false });
                    })
                    .catch(error => {
                        console.error('Error fetching questions:', error);
                    });
            }
        }
    });

    socket.on('round', (e) => {
        let index = lobbies[0]?.players.findIndex(player => player.name === e.name);
        if (index !== -1) {
            lobbies[0].players[index].score += e.result;
        }

        if (e.round >= 9) {
            io.emit('find', { lobbies: lobbies, quests: quests, final: true });
        } else {
            io.emit('find', { lobbies: lobbies, quests: quests, final: false });
        }
    });

    socket.on('disconnect', () => {
        players = [];
        lobbies = [];
        quests = [];
        io.emit('find', { lobbies: lobbies, quests: quests, final: false });
    });
});

httpserver.listen(5000, () => {
    console.log('WebSocket server listening on port 5000');
});