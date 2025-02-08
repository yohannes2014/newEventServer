import jwt from 'jsonwebtoken';
import userEvents from '../models/eventsModel.js';




// Middleware to authenticate JWT
export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// Create an event
export const createEvent = async (req, res) => {
  const { title, description, date, time } = req.body;
  const event = new userEvents({
    title,
    time,
    description,
    date,
    userId: req.user
  });
  await event.save();
  res.status(201).json({ event });
};



// Create multiple events
export const newMultipleEvents = async (req, res) => {
  const events = req.body; 


  
  try {
 
   
    const eventEntries = events.map(event => ({
      userId: req.user,  
      title: event.title,
      time: event.time,
      date: event.date,
      description: event.description
    }));
 
  
    const newEvents = await userEvents.insertMany(eventEntries);

    // Respond with the newly created events
    res.status(201).json(newEvents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};






// Get user's events
export const getEvents = async (req, res) => {
  const events = await userEvents.find({ userId: req.user });
  res.json(events);
};

// Update an event
export const updateEvent = async (req, res) => {
  const { title, description, date, time } = req.body;
  const event = await userEvents.findOneAndUpdate(
    { _id: req.params.id },
    { title, description, date, time },
    { new: true }
  );
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const event = await userEvents.findOneAndDelete({ _id: req.params.id });
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json({ message: 'Event deleted' });
};


