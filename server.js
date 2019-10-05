const express = require('express');
const app = express();
const connectDB = require('./config/db');
const http = require('http').createServer(app);
const io = module.exports.io = require('socket.io')(http);
const path = require('path');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/jackpot', require('./routes/api/jackpot'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const jackpotSocket = require('./sockets/jackpotSocket');
io.on('connection', jackpotSocket);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log(`Server started on port ${PORT}`));