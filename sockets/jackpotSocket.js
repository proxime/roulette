const io = require('../server').io;

const Jackpot = require('../models/Jackpot');
const User = require('../models/User');
let time = 0;

module.exports = async (socket) => {
    const jackpot = await Jackpot.findOne({ current: true })
        .populate('players.userId -password');
    socket.emit('setUpBet', { jackpot, time });
    socket.on('chat input', async (res) => {
        io.emit('chat output', res);
    })
    socket.on('setUpBet', async () => {
        const jackpot = await Jackpot.findOne({ current: true })
            .populate('players.userId -password');
        if (jackpot.players.length >= 2 && !jackpot.started) {
            time = 90;
            jackpot.started = true;
            await jackpot.save();
            const interval = setInterval(async () => {
                if (time > 0) time--;
                else {
                    clearInterval(interval);
                    const newJackpot = await Jackpot.findOne({ current: true })
                        .populate('players.userId -password');

                    newJackpot.started = false;
                    newJackpot.current = false;

                    const players = []

                    newJackpot.players.forEach(player => {
                        players.push({
                            id: player.userId.id,
                            nick: player.userId.nick,
                            cash: player.cash,
                            chance: player.cash / newJackpot.cash,
                            color: player.userId.color,
                        })
                    });

                    for (let i = 0; i < players.length; ++i) {
                        if (i === 0) {
                            players[i].range = players[i].chance;
                        } else {
                            players[i].range = players[i - 1].range + players[i].chance;
                        }
                    }

                    const gameTable = [];
                    gameTable.length = 200;

                    for (let i = 0; i < 200; ++i) {
                        const randomValue = Math.random();
                        for (let k = players.length - 1; k >= 0; --k) {
                            if (randomValue < players[k].range) {
                                gameTable[i] = players[k];
                            }
                        }
                    }

                    const winnerOffset = Math.random() * (185 - 60) + 60;
                    const winnerIndex = Math.floor(winnerOffset);
                    newJackpot.winner = gameTable[winnerIndex].nick;
                    const winner = await User.findById(gameTable[winnerIndex].id);
                    winner.luckycoins += Number(newJackpot.cash);

                    await winner.save();
                    await newJackpot.save();

                    io.emit('endGame', { players, gameTable, winnerOffset });
                }
            }, 1000)
        }
        io.emit('setUpBet', { jackpot, time });
    })
}
