import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const authMiddleware = async(req,res,next) =>{
    try {
        const token = req.header("auth-token")
        if(!token){
            return res.status(401).json({
                message:'Unauthorized'
            })
        }

        const user = await jwt.verify(token,process.env.JWT_SECRET)
        if(!user){
            return res.status(401).json({
                message:'Unauthorized'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
                message:'Unauthorized'
            })
    }
}