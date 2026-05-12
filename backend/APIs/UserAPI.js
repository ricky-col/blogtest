import exp from 'express'
import { authenticate, register } from '../Services/AuthService.js'
import { ArticleModel } from '../Models/ArticleModel.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js'
import cloudinary from '../config/cloudinary.js'
import upload from '../config/multer.js'
export const userRoute = exp.Router()

//Register User
userRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );

//Read all Articles
userRoute.get('/articles',verifyToken("USER") ,async (req,res) => {
    let articles = await ArticleModel.find({isArticleActive: true})
    res.status(200).json({message:"Articles:- ", payload: articles})
})
//Add comment to an article
userRoute.post('/articles',verifyToken("USER") ,async (req,res) => {
    let {articleId, comment} = req.body
    // Check User if the userId mentioned in the comment body is same as logged in user
    // if (user !== req.user.userId)
    // {
    //     return res.status(403).json({message: "Forbidden"})
    // }
    let userID = req.user.userId
    let articleDoc = await ArticleModel.findById(articleId)
    if(!articleDoc){
        res.status(401).json("Requested Article is not Found")
    }
    let commentedArticle = await ArticleModel.findByIdAndUpdate(articleId,{$push:
        {comments:{user: userID,comment: comment}}
    },{new:true, runValidators: true})
    
    res.status(201).json({message:"Article Commented Successfully",payload: commentedArticle})
    
})
