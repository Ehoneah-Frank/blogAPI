// controllers/user.js

import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new Error("No such user");
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            throw new Error("No users");
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    if (req.params.userId === req.user.id) {
        try {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(403).json({ msg: "You can update only your own profile" });
    }
};

export const deleteUser = async (req, res) => {
    if (req.params.userId === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.userId);
            return res.status(200).json({ msg: "Successfully Deleted" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(403).json({ msg: "You can delete only your own profile" });
    }
};
