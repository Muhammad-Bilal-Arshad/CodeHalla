import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
export const getUsersForSidebar = async (req, res) => {
    try{
        const userId = req.user._id 
        const users = await User.find({ _id: { $ne: userId } }).select('-password');
        res.status(200).json(users);
    }
    catch(error){
        console.error('Error in getUsersForSidebar controller:', error.message);
        return res.status(500).json({message: 'Internal server error'});

    }
}

export const getMessages = async (req, res) => {
try{
const {id:userToChatId} = req.params;
const senderId = req.user._id;
const messages = await Message.find({
    $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId }
    ]
}).sort({ createdAt: 1 });
res.status(200).json(messages);



}
catch(error){
    console.error('Error in getMessages controller:', error.message);
    return res.status(500).json({message: 'Internal server error'});
}
    
}

export const sendMessage = async (req, res) => {
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const {message} = req.body;
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            receiverId: userToChatId,
            message,
            image: imageUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
      
        console.log('Message sent successfully:', newMessage);
    }
    catch(error){
        console.error('Error in sendMessage controller:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
}