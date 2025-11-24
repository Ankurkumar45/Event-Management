const jwt = require('jsonwebtoken');
const User = require("../models/Users.js");

const JWT_SECRET = process.env.JWT_SECRET || "WeR0AnPzcHmTrjZC6_y1n1X6Y0up-0lCHA48xv3O9_0";

const protect = async (req, res, next) => {
    let token;
    try {
        // console.log("Headers: ", req.headers.authorization);
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        console.log(authHeader)

        if (!token) {
            return res.status(401).json({ message: "Not authorized, token missing!" });
        }


        const decoded = jwt.verify(token, JWT_SECRET);
        // Load user from DB
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(404).json({ message: "User not found!" });
        }
        // req.User = { id: decoded.id };
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Not authorized, token invalid!" });
    }
}

module.exports = { protect };