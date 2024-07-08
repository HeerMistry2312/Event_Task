import mongoose from "mongoose";

export interface IEvent {
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: mongoose.Types.ObjectId;
    participants: mongoose.Types.ObjectId[];
}