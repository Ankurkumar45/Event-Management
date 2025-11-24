const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

module.exports = mongoose.model('userSchema', userSchema)