import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config()


export const authenToken = (req, res, next) =>{
      const token =  req.headers.token;
      // Beaear [token]
      if(!token){
        return res.status(401).json({
                message: 'Access token not found',
                success: false
            });
            }
    let accessToken = token && token.split(" ")[1];
    try{
     const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET)
     req.user = decoded
     next();
    }catch(err){
        console.log('err :>> ', err);
        return res.status(401).json({success: false, message: "You're not authenticated" });
    }
    }
export const authenTokenAdmin = (req, res, next) => {
    authenToken(req,res, () => {
        if(req.user.userId == req.params.id || req.user.admin){
            next();
        }
        else{
            res.status(403).json({success: false, message: "You're not admin!"})
        }
    })
}

