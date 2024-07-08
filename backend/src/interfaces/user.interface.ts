import mongoose from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    registrations: mongoose.Types.ObjectId[];
}