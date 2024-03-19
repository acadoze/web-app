
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        lowercase: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true
    },

}, {timestamps: true})

module.exports = mongoose.model('Teacher', userSchema)