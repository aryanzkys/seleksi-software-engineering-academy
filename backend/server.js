        require('dotenv').config();
        const express = require('express');
        const mongoose = require('mongoose');
        const cors = require('cors'); 
        const app = express();
        const PORT = process.env.PORT || 5000;

        app.use(express.json());
        app.use(cors());

        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('MongoDB connected successfully'))
            .catch(err => console.error('MongoDB connection error:', err));

        app.use('/api/auth', require('./routes/authRoutes'));
        app.use('/api/subscriptions', require('./routes/subscriptionRoutes')); 

        app.get('/', (req, res) => {
            res.send('SEA Catering Backend API is running!');
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        