import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
export const signup = async(req, res) => {
    const { fullName, email, password } = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: 'Please fill all fields'});
        }
        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }
        console.log('Received data:', req.body);
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
     

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            console.log('User created successfully:', newUser);
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,

            });
          
        }else{
            console.log('User not created');
            return res.status(400).json({message: 'User not created'});
        }



    }
    catch(error){
        console.error(error);
        console.log('Error in signup controller:', error.message);
        return res.status(500).json({message: 'Server error'});
    }
    }

export const login = (req, res) => {
    res.send('Login Page');
    }

export const logout = (req, res) => {
    res.send('Logout Page');
    }
