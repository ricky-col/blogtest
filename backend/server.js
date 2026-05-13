import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
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
app.use(cors({ origin: ['https://blogtest-1-d2zo.onrender.com', 'http://localhost:5174'], credentials: true }))
//add body parser middleware
app.use(exp.json())
//add cookie parser middleware
app.use(cookieParser())
// To connect the required APIs
app.use('/user-api', userRoute)
app.use('/author-api', authorRoute)
app.use('/admin-api', adminRoute)
app.use('/common-api', commonRoute)

// Connecting to DB and then starting the server
const startServer = async () => {
    try {
        await connect(process.env.DB_URL, {
            serverSelectionTimeoutMS: 5000,
            dbName: 'blog' // Explicitly set the DB name
        })
        console.log("✅ DB Connection Successful (Connected to MongoDB Atlas)")
        
        // Start HTTP Server ONLY after DB connection is successful
        app.listen(process.env.PORT, () =>
            console.log(`🚀 Server Started on port ${process.env.PORT} and DB is ready!`)
        )
    }
    catch (err) {
        console.error("❌ CRITICAL: DB Connection Error:", {
            message: err.message,
            code: err.code
        })
        process.exit(1) // Stop the process if we can't connect to DB
    }
}

startServer()

//Dealing with Invalid path
app.use((req, res, next) => {
    res.json({ message: `${req.url} is invalid path` })
})

//Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    res.status(statusCode).json({ message: "error", reason: err.message })

})
