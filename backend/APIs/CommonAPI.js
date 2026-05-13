// Common API for generic operations
import exp from 'express'
import { authenticate } from '../Services/AuthService.js'
import { UserTypeModel } from '../Models/UserModel.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import bcrypt from 'bcrypt'
export const commonRoute = exp.Router()

// Login
commonRoute.post('/login',async (req,res) => {
    let userCred = req.body

    let {token,user} = await authenticate(userCred)

    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"none", // Required for cross-site cookies
        secure:true      // Required when sameSite is 'none'
    })
    //Send Response
    res.status(200).json({message:"Login Success",payload: user})

})

// Changing the password
commonRoute.put('/change-password', async (req,res) => {
    let enteredUser = req.body
    let getuser = await UserTypeModel.findOne({email: enteredUser.email})
    if(!getuser){
        res.status(401).json({message: "User is not found"})
    }

    const match = await bcrypt.compare(enteredUser.currentPassword,getuser.password)
    if(!match){
        res.status(401).json({message:"Entered Password doesn't match to current password"})
    }
    
    //Hash and Replace plain password
    const hashedPassword = await bcrypt.hash(enteredUser.newPassword,10)
    
    const updatedUser = await UserTypeModel.findOneAndUpdate({email: enteredUser.email},{$set:{password: hashedPassword}},{save: true})
    //Send Response
    res.status(201).json({message:`Password is updated for ${updatedUser.email}`})
})
//Logout
commonRoute.get('/logout', (req,res)=>{
    // Clear the cookie names 'token'
    res.clearCookie('token',{
        httpOnly:true,
        sameSite: 'none',
        secure: true
    })

    res.status(200).json({message:"Logged Out Successfully"})
})

// Page Refresh
commonRoute.get("/check-auth", verifyToken("USER","AUTHOR","ADMIN"), async (req,res)=>{
    try {
        let fullUser = await UserTypeModel.findById(req.user.userId).select("-password");
        if (!fullUser) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "Authenticated", payload: fullUser});
    } catch (err) {
        res.status(500).json({message: "Server Error", error: err.message});
    }
})