import exp from 'express'
import { UserTypeModel } from '../Models/UserModel.js'
import { ArticleModel } from '../Models/ArticleModel.js'
import { register, authenticate } from '../Services/AuthService.js'
import { checkAuthor } from '../Middlewares/checkAuthor.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import upload from '../config/multer.js'
import cloudinary from '../config/cloudinary.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js'
export const authorRoute = exp.Router()

//Register User
authorRoute.post(
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
                role: "AUTHOR",
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

//Create Article (Protected Route)
authorRoute.post('/articles', verifyToken("AUTHOR"), async (req,res) => {
    //Get Article from Request
    let articleDoc = req.body
    articleDoc.author = req.user.userId
    //Create Article Document
    let newArticleObj =new ArticleModel(articleDoc)
    //Save the Article
    let createdArticleDoc = await newArticleObj.save()
    //Send the Response
    res.status(201).json({message:"Article Created",payload:createdArticleDoc})

    
})
//Read Articles of Author (Protected Route)
authorRoute.get("/articles",verifyToken("AUTHOR"), async (req,res) => {
    //Read Articles by this Author
    let aid = req.user.userId
    let articles = await ArticleModel.find({author: aid, isArticleActive: true}).populate("author","firstName email")
    //Send Response
    res.status(201).json({message:"List of Articles are:-", payload:articles})
})
//Edit Article (Protected Route)
authorRoute.put("/articles",verifyToken("AUTHOR"), async (req,res) => {
    // Get the updated article
    let {articleId,title,category,content} = req.body
    // Find the Article
    let checkArticle = await ArticleModel.findById(articleId)
    if(!checkArticle){
        return res.status(401).json({message:"Article is Not Found"})    
    }
    let author = checkArticle.author.toString()
    if(author !== req.user.userId)
    {
        return res.status(403).json({message: "Forbidden"})

    }
    // update the article
    let updatedArticle = await ArticleModel.findByIdAndUpdate(articleId,{
        $set:{title,category,content}},{new:true}
    )
    // Send the response
    res.status(201).json({message: "Article Updated",payload: updatedArticle})

    
})
//Delete (Soft Delete) Article (Protected Route)
authorRoute.delete('/article/:articleId',verifyToken("AUTHOR") , async (req,res) => {
    // Get Author Id and Article Id to validate the required article
    let artId = req.params.articleId
    // Find the required article
    let findArticle = await ArticleModel.findById(artId)
    if(!findArticle){
        return res.status(401).json({message:"Article is Not Found"})
    }
    let author = findArticle.author.toString()
    if(author !== req.user.userId)
    {
        return res.status(403).json({message: "Forbidden"})

    }
    // Soft Delete/Restore the Article by toggling the isArticleActive attribute
    const newStatus = !findArticle.isArticleActive
    await ArticleModel.findByIdAndUpdate(artId,{$set:{isArticleActive: newStatus}},{new:true})
    
    // Send the Response
    res.status(201).json({
        message: newStatus ? "Article Restored" : "Article Deleted",
        payload: newStatus
    })

})