import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    registrations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Event',
    }],
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
