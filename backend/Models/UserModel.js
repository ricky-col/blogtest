import { Schema, model } from "mongoose";

const userSchema = new Schema({

    firstName:{
        type: String,
        required: [true, "First Name is Required"]
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required: [true, "Email is Required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profileImageUrl:{
        type: String
    },
    role:{
        type: String,
        enum: ["AUTHOR","USER","ADMIN"],
        required: [true, "{Value} is Invalid Role. Choose any of Author/User"]
    },
    isActive:{
        type: Boolean,
        default: true,
    }
},
{
    timestamps:true,
    strict:"throw",
    versionKey:false
}
)

export const UserTypeModel = model("user",userSchema)