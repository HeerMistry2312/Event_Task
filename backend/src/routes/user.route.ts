import { UserControl } from "../controller/user.controller";
import express from "express";
import { Authentication } from "../middleware/auth.middleware";
import { EventController } from "../controller/event.controller";
import User from "../model/user.model";

export class UserRoute {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {
        this.router.post('/signup', UserControl.signUp)
        this.router.post('/login', UserControl.login)
        this.router.get('/profile', Authentication.authUser, UserControl.getUser)
        this.router.post('/create', Authentication.authUser, EventController.createEvent)
        this.router.put('/update/:id', Authentication.authUser, EventController.updateEvent)
        this.router.delete('/delete/:id', Authentication.authUser, EventController.deleteEvent)
        this.router.get('/all', Authentication.authUser, EventController.getAllEvent)
        this.router.get('/:id', Authentication.authUser, EventController.getEvent)
        this.router.get('/register/:id', Authentication.authUser, UserControl.register)
        this.router.get('/logout', Authentication.authUser, UserControl.logout)
        this.router.put('/updateUser', Authentication.authUser, UserControl.updateUser)
    }

    public getRoute(): express.Router {
        return this.router;
    }
}