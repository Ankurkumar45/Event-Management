const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "WeR0AnPzcHmTrjZC6_y1n1X6Y0up-0lCHA48xv3O9_0";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log(name, email, password);
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required!" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already registered!" });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashed, role });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id };

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
            decodedUser: req.user  // optional
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found!" });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

module.exports = { register, login, getMe };