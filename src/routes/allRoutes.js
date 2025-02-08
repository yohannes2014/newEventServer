import { Router } from "express";
import authRoute from "./authRoute.js";
import eventRoute from "./eventsRoute.js";

const allRoute = Router();
// all user route
allRoute.use('/auth',authRoute);
//all events route
allRoute.use('/events',eventRoute);



export default allRoute;