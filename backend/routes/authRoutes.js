        const express = require('express');
        const router = express.Router();
        const User = require('../models/User');
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');

        router.post('/register', async (req, res) => {
            const { fullName, email, password } = req.body;

            if (!fullName || !email || !password) {
                return res.status(400).json({ message: 'Please enter all fields' });
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
                });
            }

            try {
                let user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ message: 'User with that email already exists' });
                }

                user = new User({
                    fullName,
                    email,
                    password 
                });

                await user.save();

                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.status(201).json({
                    message: 'User registered successfully',
                    token,
                    user: {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        role: user.role
                    }
                });

            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        });

        router.post('/login', async (req, res) => {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Please enter all fields' });
            }

            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const isMatch = await user.matchPassword(password);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.json({
                    message: 'Logged in successfully',
                    token,
                    user: {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        role: user.role
                    }
                });

            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        });

        module.exports = router;
        