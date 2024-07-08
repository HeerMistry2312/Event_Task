import mongoose, { Document, Schema } from 'mongoose';
import { IEvent } from '../interfaces/event.interface';

const EventSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Event = mongoose.model<IEvent>('Event', EventSchema);
export default Event;
