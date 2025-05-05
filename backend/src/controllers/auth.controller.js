import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
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

export const login = async (req, res) => {
   
    const { email, password } = req.body;
    console.log('Received data:', req.body);
    if(!email || !password){
        return res.status(400).json({message: 'Please fill all fields'});
    }
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        generateToken(user._id, res);
        console.log('User logged in successfully:', user);
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    }
    catch(error)
{
        console.error(error);
        console.log('Error in login controller:', error.message);
        return res.status(500).json({message: 'Server error'});

}    }

export const logout = (req, res) => {
    try{
        res.clearCookie('token', {maxAge: 0});  
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch(error){
        console.error(error);
        console.log('Error in logout controller:', error.message);
        return res.status(500).json({message: 'Server error'});

    }
    }

export const updateProfile = async (req, res) => {

    try{
        const{profilePicture} = req.body;

        const userID = req.user._id 
        if(!profilePicture){
              return res.status(400).json({message: 'Profile picture is required'});
         }

         await cloudinary.uploader.upload(profilePicture)
          const upldatedUser = await User.findByIdAndUpdate(userID, {
            profilePicture: result.secure_url,
            }, {new: true});
            if(!upldatedUser){
                return res.status(400).json({message: 'User not found'});
            }
            console.log('User updated successfully:', upldatedUser);
            return res.status(200).json({
                _id: upldatedUser._id,
                fullName: upldatedUser.fullName,
                email: upldatedUser.email,
                profilePicture: upldatedUser.profilePicture,
            });

    }
    catch(error){

    }
}

export const checkAuth = (req, res) => {
     try{
        console.log('User:', req.user);
        res.status(200).json(req.user)

     }
     catch(error){
        console.error(error);
        console.log('Error in checkAuth controller:', error.message);
        return res.status(500).json({message: 'Server error'});

     }
}
