import mongoose from "mongoose"
import { config } from "../config/config"
import AppError from "../utils/appError"
export const connectDb = async () => {
    try {
        if (!config.mongo_url) {
            throw new AppError(500, 'connection String Not found')
        }
        await mongoose.connect(config.mongo_url)
        console.log('connection established')
    } catch (error: any) {
        throw new AppError(error.message, error.statusCode)

    }
}