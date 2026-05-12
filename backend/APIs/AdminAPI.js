import exp from 'express'
import { verifyToken } from '../Middlewares/verifyToken.js'
import { UserTypeModel } from '../Models/UserModel.js'
import { ArticleModel } from '../Models/ArticleModel.js'
export const adminRoute = exp.Router()


// Block Users
adminRoute.put('/block',verifyToken,async (req,res) => {
    let enteredUser = req.body

    let getUser = await UserTypeModel.findOne({email: enteredUser.email})
    if(!getUser){
        res.status(401).json({message: "User is not found"})
    }
    if(!getUser.isActive){
        res.status(401).json({message: `${getUser.email} is already blocked.`})
    }
    let blockingUser = await UserTypeModel.findOneAndUpdate({email: enteredUser.email},{$set:{isActive: false}},{save:true})

    res.status(201).json({message: `${blockingUser.email} is blocked`})
    
})
// Unblock User
adminRoute.put('/unblock',verifyToken, async (req,res) => {
    let enteredUser = req.body

    let getUser = await UserTypeModel.findOne({email: enteredUser.email})
    if(!getUser){
        res.status(401).json({message: "User is not found"})
    }
    if(getUser.isActive){
        res.status(401).json({message: `${getUser.email} is already unblocked.`})
    }
    let unblockingUser = await UserTypeModel.findOneAndUpdate({email: enteredUser.email},{$set:{isActive: true}},{save:true})

    res.status(201).json({message: `${unblockingUser.email} is unblocked`})
})
// Read all Articles(optional)
adminRoute.get('/articles', verifyToken, async (req,res) => {
    let articles = await ArticleModel.find()
    res.status(201).json({messages: "Articles are:- ",payload: articles})
})