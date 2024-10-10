import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passkey: {
        type: String,
    },
    speciality: {
        type: String,
    },
    appointmens: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Appointment",
        },
    ],
    discription: {
        type: String,
    },
}, { timestamps: true });
export const Admin = mongoose.model('admin', schema);
