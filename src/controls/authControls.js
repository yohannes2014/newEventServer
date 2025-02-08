import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  userModel  from '../models/usersModel.js';
import userEvents from '../models/eventsModel.js';



// Register route
export const userRegister = async (req, res) => {
  try{
    const { username, email, password } = req.body;
    
    const user = await userModel.findOne({ email });
// here check user email enterd check if existed on database if exist return
    if (user) {
        return res.json('User email already exists, try another');
    }
//  password hash using bcrypt 
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        username,
        email,
        password: passwordHash,
        dateOfReg: new Date(),
    });
// save to database
    await newUser.save();
    res.status(201).json('Successfully registered');

}
catch(err){
    console.log(err);
    res.status(500).json({message:"Server error "})
}
};





// Login route
export const usersLogin = async (req, res) => {
  try{
    const { email, password } = req.body;
    
    const userFound = await userModel.findOne({ email });
// here check if user exist if not stop and send message
    if (!userFound) {
        return res.json({login:false,message:'User not found'});
    }
// after user found check password input
    const passMatch = await bcrypt.compare(password, userFound.password);
    if (!passMatch) {
        return res.json({login:false, message:'Invalid password'});
    }

    // at this stage username and password confirmed
//sign token
  const token = jwt.sign({ id: userFound._id  }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Set token as a cookie
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'yohannes' });
// success message to client side
  res.status(201).json({login:true, message: 'Login successful', token });

  }
  catch(err){
    console.error(err);
    res.status(500).json({message: "Server error faild to login"})
  }
};





// Logout route
export const userLogout = (req, res) => {
 try{
  //clear cookie 
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });

 }
 catch(err){
  // if there is error send error message
  console.error(err);
  res.status(500).json({message: "Server error logout faild"})
 }
};

// get user information


export const getUser = async (req, res) => {
  try {
       //finding user from db
    const user = await userModel.findById(req.user); 

    // to restrict information only below information can get on other side
    const userInfo = {
      username:user.username,
      email:user.email,
      id:user._id
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //find events by user id
    const events = await userEvents.find({ userId: req.user });

    res.json({
      userInfo,  
      events,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching user data', error });
  }
};



