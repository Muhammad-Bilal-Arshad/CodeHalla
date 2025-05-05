import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
       image: {
            type: String,
            default: "",
        },
        video: {
            type: String,
            default: "",
        },
        audio: {
            type: String,
            default: "",
        },
        file: {
            type: String,
            default: "",
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
       
       },{timestamps: true}   
);

const Messaage = mongoose.model("Message", messageSchema);
export default Messaage;