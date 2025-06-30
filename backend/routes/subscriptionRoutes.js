        const express = require('express');
        const router = express.Router();
        const { protect, authorize } = require('../middleware/authMiddleware');

        router.get('/my-plan', protect, (req, res) => {
            res.json({
                message: `Welcome, ${req.user.fullName}! This is your subscription plan.`,
                userId: req.user._id,
                userEmail: req.user.email,
                userRole: req.user.role
            });
        });

        router.get('/all-plans', protect, authorize('admin'), (req, res) => {
            res.json({
                message: `Admin access granted! Here are all subscription plans.`,
                adminId: req.user._id,
                adminEmail: req.user.email
            });
        });

        module.exports = router;
        