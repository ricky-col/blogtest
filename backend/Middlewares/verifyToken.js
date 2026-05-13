import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
config()

export const verifyToken = (...allowedRoles) => {
    return async (req,res,next) =>{
    // Read Token from Request
        try{
            let token = req.cookies.token
            console.log("Token: ",token)
            
            if(!token){
                return res.status(401).json({message:"Unauthorized Request. Please Login"})
            }
            // Verify the validity of the token(Decoding the Token)
            let decodedToken = jwt.verify(token,process.env.JWT_SECRET)
            
            if(!allowedRoles.includes(decodedToken.role)){
                return res.status(403).json({message:"Forbidden. You are not authorized"})
            }

            // Attach user info to req for use in routes
            req.user = decodedToken

            //Forward Request to the next middleware/route
            next()}
        catch(err)
        {
            if (err.name === "TokenExpiredError"){
                return res.status(401).json({message: "Session Expired. Try Again!"})
            }
            if (err.name === "JsonWebTokenError"){
                return res.status(401).json({message: "Invalid Token. Please Try Again"})
            }
            // next(err)
        }
    }
}
