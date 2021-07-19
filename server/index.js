const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/posts');
const convoRoutes = require('./routes/api/conversation');
const messageRoutes = require('./routes/api/message');

// App Initialized
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: true,
    origins: ['http://localhost:3000'],
});

let connectedUsers = {};

// Socket Server
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (userId) => {
        connectedUsers[userId] = socket.id;
    });

    socket.on('message', ({ userId, senderId, text }) => {
        io.to(connectedUsers[userId]).emit('message', {
            senderId,
            text,
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: '30mb', extended: false }));
app.use(express.urlencoded({ limit: '30mb', extended: false }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('API Running');
});
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/conversation', convoRoutes);
app.use('/api/message', messageRoutes);

//  Port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Console Up and Running at Port ${PORT}`);
});
