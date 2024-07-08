import { Request, Response, NextFunction } from 'express'

const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statuCode || 500).json({
        statuCode: error.statusCode || 500,
        message: error.message || 'Internal Server error'
    })
}

export default errorHandlerMiddleware