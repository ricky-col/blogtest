import { UserTypeModel } from "../Models/UserModel.js"

export const checkAuthor = async(req,res,next) => {
    // Get Author id(But not sure whether to get it from body or params)
    let aid = req.body?.author || req.params.authorId
    // Verify Author
    let author = await UserTypeModel.findById(aid)
    // If Author not found
    if(!author){
        return res.status(401).json({message: "Invalid Author"})
    }
    // If Author found but role is different
    if(author.role !== "AUTHOR"){
        return res.status(401).json({message: "User is not an Author"})
    }
    // If Author is Blocked
    if(!author.isActive){
        return res.status(403).json({message: "Author Account is not Active"})
    }
    //Forward Req to next
    next()
}