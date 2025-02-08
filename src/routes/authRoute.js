import { Router } from "express";
import{ userRegister, usersLogin, userLogout, getUser} from "../controls/authControls.js"
import { protect } from "../controls/eventControls.js";

const authRoute = Router();

// Register route
authRoute.post('/register', userRegister);


// Login route
authRoute.post('/login', usersLogin);


// Logout route
authRoute.post('/logout', userLogout); 

// Get user info
authRoute.get('/', protect, getUser); 





export default authRoute
