import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserTypeModel } from "../Models/UserModel.js"
import { config } from "dotenv"
config()

//Register Function
export const register = async (userObj) => {
    // Check if already exists
    let user = await UserTypeModel()
    // Create Document
    const userDoc = new UserTypeModel(userObj)
    //Validation for Empty Passwords
    await userDoc.validate()
    //Hash and Replace plain password
    userDoc.password = await bcrypt.hash(userDoc.password,10)
    //Save
    const created = await userDoc.save()
    //Convert document to object to remove password
    const newUserObj = created.toObject()
    //Remove Password
    delete newUserObj.password
    //Return the User Obj without password
    return newUserObj
}

//Login Function
export const authenticate = async ({ email, password }) => {
    //Check user with email & role
    const user = await UserTypeModel.findOne({ email })

    if(!user)
    {
        const err = new Error("User Not Found")
        err.status = 401
        throw err
    }
    
    //Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        const err = new Error("Invalid Password")
        err.status = 401
        throw err
    }
    // Check if User is Blocked
    if(!user.isActive){
        const err = new Error("Your Account is Blocked. Please Contact Admin")
        err.status = 403
        throw err
    }
    //Generate Token
    const token = jwt.sign({ userId: user._id, 
        role: user.role, email: user.email, profileImageUrl: user.profileImageUrl, firstName: user.firstName},
        process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
    
    const userObj = user.toObject()
    delete userObj.password

    return { token, user: userObj }
    
    
}