import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/tokenPayload';
import { config } from '../config/config';
import AppError from '../utils/appError';
import '../types/expressExtension'
import mongoose from 'mongoose';

export class Authentication {
    public static async authUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            let token = req.cookies.token;
            if (!token) {
                throw new AppError(401, 'User is not Authorized');
            }
            if (!config.secret_key) {
                throw new AppError(404, 'data not found');
            }
            const decoded = jwt.verify(token, config.secret_key) as TokenPayload
            req.id = decoded.id;

            next();
        } catch (error: any) {
            next(error)
        }
    }
}