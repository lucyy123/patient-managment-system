import mongoose from "mongoose";
const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    docId: {
        type: mongoose.Types.ObjectId,
        ref: "admin",
    },
    physicianName: {
        type: String,
    },
    time: {
        type: String,
    },
    reason: {
        type: String,
    },
    additionalInfo: {
        type: String
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["pending", "cancelled", "scheduled"],
        default: "pending",
    },
}, { timestamps: true });
export const Appointment = mongoose.model("Appointment", schema);
