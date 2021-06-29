import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import usersRoutes from './routes/api/users.js';
import authRoutes from './routes/api/auth.js';
import profileRoutes from './routes/api/profile.js';
import postRoutes from './routes/api/posts.js';


// App Initialized
const app = express();

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

//  Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Console Up and Running at Port ${PORT}`);
});
