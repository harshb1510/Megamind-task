import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    phone: {
        type: Number,
    },
    otpCode: {
        type: Number,
    },
    otpExpiration: {
        type: Number,
    },
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
