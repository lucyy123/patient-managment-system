import mongoose from "mongoose";
export const mongoDataBase = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB is Connected');
    }
    catch (error) {
        console.log('error:', error);
    }
};
