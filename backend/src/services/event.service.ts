import { config } from "../config/config";
import User from "../model/user.model";
import Event from "../model/event.model";
import AppError from "../utils/appError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose, { Types } from "mongoose";
export default class EventService {
    public static async createEVent(title: string, description: string, date: Date, location: string, organizer: Types.ObjectId): Promise<object> {
        if (await Event.findOne({ title })) {
            throw new AppError(409, 'Event already exist');
        }

        const newEvent = new Event({ title, description, date, location, organizer })
        await newEvent.save();
        return newEvent;
    }

    public static async updateEvent(eventId: string, title: string | undefined, description: string | undefined, date: Date | undefined, location: string | undefined): Promise<object | null> {
        const event = await Event.findById(eventId)
        if (!event) {
            throw new AppError(404, 'Event not found');
        }

        const updateEvent = await Event.findByIdAndUpdate(new mongoose.Types.ObjectId(eventId), {
            title: title ? title : event.title,
            description: description ? description : event.description,
            date: date ? date : event.date, location: location ? location : event.location,
            organizer: event.organizer
        })

        return updateEvent;
    }

    public static async deleteEvent(eventId: string): Promise<void> {
        const event = await Event.findById(eventId)
        if (!event) {
            throw new AppError(404, 'Event not found');
        }
        await Event.findByIdAndDelete(event._id)

    }

    public static async getAllEvents(): Promise<any> {
        const events = await Event.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "organizer",
                    foreignField: "_id",
                    as: "organizer",
                },
            },
            {
                $unwind: {
                    path: '$organizer',
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    organizer: "$organizer.username",
                    description: 1,
                    date: 1,
                    location: 1,
                    participants: 1
                }
            },
        ])
        if (!events) {
            throw new AppError(404, 'No Events are available')
        }
        return events
    }

    public static async getEvent(eventId: string): Promise<object> {
        const event = await Event.findById(new mongoose.Types.ObjectId(eventId))
        if (!event) {
            throw new AppError(404, 'Event not available')
        }
        const getEVent = await Event.aggregate([
            {
                $match: {
                    _id: event._id
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "organizer",
                    foreignField: "_id",
                    as: "organizer",
                },
            },
            {
                $unwind: {
                    path: '$organizer',
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    organizer: "$organizer.username",
                    description: 1,
                    date: 1,
                    location: 1,
                    participants: 1
                }
            },
        ])
        return getEVent.length > 0 ? getEVent[0] : null
    }
}