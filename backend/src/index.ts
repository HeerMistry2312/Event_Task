import express from 'express'
import { connectDb } from './db/db'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware'
import AppError from './utils/appError'
import { UserRoute } from './routes/user.route'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
export class App {
    private app: express.Application
    constructor() {
        this.app = express()
        this.config()
        this.connectDb()
        this.routes()

    }
    private config(): void {
        this.app.use(cors({
            credentials: true,
            origin: 'http://localhost:4200',

        }))
        this.app.use(cookieParser())
        this.app.use(express.json())
        this.app.use(bodyParser.json())
    }
    private connectDb(): void {
        connectDb()
    }
    private routes(): void {
        const user_route = new UserRoute().getRoute()
        this.app.use('/user', user_route)
    }
    public start(port: string | undefined): void {
        this.app.use(errorHandlerMiddleware)
        this.app.listen(port, () => {
            console.log("server started")
        })
    }
}