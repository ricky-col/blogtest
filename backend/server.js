import exp  from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { userRoute } from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import cookieParser from 'cookie-parser'
import { commonRoute } from './APIs/CommonAPI.js'
import cors from 'cors'
config() //process.env
// Create Express Application
const app = exp()
// Use CORS middleware
app.use(cors({origin:['http://localhost:5173', 'http://localhost:5174'],credentials:true}))
//add body parser middleware
app.use(exp.json())
//add cookie parser middleware
app.use(cookieParser())
// To connect the required APIs
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRoute)

// Connecting to DB
const connectDB = async()=>{

    try
    {
        await connect(process.env.DB_URL)
        console.log("DB Connection Succesful")
        // Start HTTP Server
        app.listen(process.env.PORT,()=>console.log("Server Started"))
    }
    catch(err)
    {
        console.log("Error in DB Connection",err)
    }

}
connectDB()

//Dealing with Invalid path
app.use((req,res,next)=>{
    res.json({message: `${req.url} is invalid path`})
})

//Error Handling Middleware
app.use((err,req,res,next)=>{
    const statusCode = err.status || 500
    res.status(statusCode).json({message:"error",reason:err.message})
    
})
