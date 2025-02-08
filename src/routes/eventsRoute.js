import { Router } from "express";
import { createEvent,  deleteEvent, getEvents, newMultipleEvents, protect, updateEvent } from "../controls/eventControls.js";

const eventRoute = Router();



// Create an event
eventRoute.post('/', protect, createEvent);

//getEvets
eventRoute.get('/', protect, getEvents);  
 
//Create multiple event
eventRoute.post('/multiple', protect, newMultipleEvents);


// Update an event
eventRoute.put('/:id', protect, updateEvent);

// Delete an event
eventRoute.delete('/:id',protect, deleteEvent);




export default eventRoute
