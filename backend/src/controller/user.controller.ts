import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import UserService from '../services/user.service';
export class UserControl {

    public static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password } = req.body;

            let newUser = await UserService.signUp(username, email, password)

            res.status(200).send(newUser)
        } catch (error: any) {
            next(error)
        }
    }


    public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password } = req.body;
            let user = await UserService.login(username, password)
            res.cookie('token', user, {
                path: '/',
                httpOnly: true,
                secure: true
            }).status(200).json({ user });

        } catch (error: any) {
            next(error)
        }
    }

    public static async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.id!
            let newUser = await UserService.getUser(id)

            res.status(200).send(newUser)
        } catch (error: any) {
            next(error)
        }
    }
    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.id!
            const { username, email } = req.body;

            let updateEvent = await UserService.updateUser(id, username, email)

            res.status(200).send(updateEvent)
        } catch (error: any) {
            next(error)
        }
    }

    public static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log('hii' + typeof (req.id))
            res.clearCookie('token', {
                path: '/',
                httpOnly: true,
                secure: true,
                // sameSite: 'lax'
            });

            //res.status(200);
        } catch (error: any) {
            next(error)
        }
    }

    public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.id!.toString()
            const eventId = req.params.id
            let user = await UserService.register(id, eventId)
            res.status(200).send(user);

        } catch (error: any) {
            next(error)
        }
    }

}