import mongoose from "mongoose";

declare module 'express' {
    interface Request {
        id?: mongoose.Types.ObjectId;
    }
}