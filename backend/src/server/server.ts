import { App } from "..";
import { config } from "../config/config";
import AppError from "../utils/appError";
const server = new App()
if (!config.port) {
    throw new AppError(404, 'Port not found')
}
server.start(config.port)