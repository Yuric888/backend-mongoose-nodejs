import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "user",
        enum: ['user', 'admin']
    },
},{ timestamps: true },
)

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;