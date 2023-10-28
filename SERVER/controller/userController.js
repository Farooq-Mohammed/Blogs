import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../model/user.js";

dotenv.config();

export const signupUser = async (req, res) => {
  try {

    // const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = {username: req.body.username, email: req.body.email, password: hashedPassword};

    const newUser = new User(user);
    await newUser.save();

    return res.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error occured during signing up", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(404).json({msg: "No user found"});

    let match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.status(400).json({msg: "Password does not match"}); 
    
    const accesstoken = jwt.sign(user.toJSON(), process.env.SECRET_ACCESS_KEY, { expiresIn: '30m' });
    return res.status(200).json({ msg: 'Login Successfull', username: user.username, email: user.email, accesstoken });
    
  } catch(error) {
    return res.status(500).json({msg: "Error occured during login", error});
  }
}
