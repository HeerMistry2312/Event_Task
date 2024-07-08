import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import EventService from '../services/event.service';
export class EventController {
    public static async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.id!
            const { title, description, date, location } = req.body;

            let newEvent = await EventService.createEVent(title, description, date, location, id)

            res.status(200).send(newEvent)
        } catch (error: any) {
            next(error)
        }
    }
    public static async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id
            const { title, description, date, location, organizer } = req.body;

            let updateEvent = await EventService.updateEvent(id, title, description, date, location)

            res.status(200).send(updateEvent)
        } catch (error: any) {
            next(error)
        }
    }

    public static async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id
            const deleteEvent = await EventService.deleteEvent(id)
            res.status(200).send({})
        } catch (error: any) {
            next(error)
        }
    }

    public static async getAllEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            let allEvents = await EventService.getAllEvents()

            res.status(200).send(allEvents)
        } catch (error: any) {
            next(error)
        }
    }
    public static async getEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id
            const event = await EventService.getEvent(id)
            res.status(200).send(event)
        } catch (error: any) {
            next(error)
        }
    }

}