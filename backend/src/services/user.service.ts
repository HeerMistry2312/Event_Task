import { config } from "../config/config";
import User from "../model/user.model";
import Event from "../model/event.model";
import AppError from "../utils/appError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose, { Types } from "mongoose";
export default class UserService {

    public static async signUp(username: string, email: string, password: string): Promise<object> {
        if (await User.findOne({ email })) {
            throw new AppError(409, 'User already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save();
        return newUser;
    }

    public static async register(userId: string, eventId: string): Promise<string> {
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user) {
            throw new AppError(404, 'User Not Found')
        }

        if (!event) {
            throw new AppError(404, 'Event Not Found')
        }
        if (event.participants.includes(new mongoose.Types.ObjectId(userId))) {
            throw new AppError(402, 'User already registered for this event');
        }
        user.registrations.push(new mongoose.Types.ObjectId(eventId));
        await user.save();
        event.participants.push(new mongoose.Types.ObjectId(userId));
        await event.save();
        return 'User register Successfully'
    }


    public static async login(
        username: string,
        password: string
    ): Promise<string> {

        let user = await User.findOne({ username });
        if (!user) {
            throw new AppError(404, "User Doesn't Exist");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError(401, 'credentials are wrong');
        }
        if (!config.secret_key) {
            throw new AppError(404, 'secret key not found');
        }
        const token = jwt.sign({ id: user._id }, config.secret_key, { expiresIn: "7h" });

        return token;
    }
    public static async getUser(id: Types.ObjectId): Promise<object> {
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'registrations',
                    foreignField: '_id',
                    as: 'registrations'
                }
            }, {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    registrations: '$registrations'
                }
            }
        ])
        if (!user) {
            throw new AppError(404, 'User not found');
        }
        return user.length > 0 ? user[0] : null;
    }

    public static async updateUser(userId: Types.ObjectId, username: string | undefined, email: string | undefined): Promise<object | null> {
        const user = await User.findById(userId)
        if (!user) {
            throw new AppError(404, 'Event not found');
        }

        const updateUser = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(userId), {
            username: username ? username : user.username,
            email: email ? email : user.email,
        })

        const userData = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'registrations',
                    foreignField: '_id',
                    as: 'registrations'
                }
            }, {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    registrations: '$registrations'
                }
            }
        ])
        return userData.length > 0 ? userData[0] : null;
    }
}