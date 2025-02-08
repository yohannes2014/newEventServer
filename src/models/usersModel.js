import mongoose from "mongoose";
//user Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required:true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required:true},
    dateOfReg: { type: String, required:true},
  });
/// User model
const userModel = mongoose.model('users', userSchema)

export default userModel;
 