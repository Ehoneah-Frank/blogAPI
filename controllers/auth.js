import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

// Register a new user
authRouter.post('/register', async (req, res) => {
    try {
        // Check if the user already exists
        const isExisting = await User.findOne({ email: req.body.email });
        if (isExisting) {
            return res.status(400).json({ message: "An account with this email already exists. Try a new email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });

        // Return the newly created user
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Login a user
authRouter.post('/login', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

export default authRouter;
