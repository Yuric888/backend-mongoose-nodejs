import dotenv from 'dotenv';
dotenv.config()


export const authenToken = (req, res, next) =>{
      const authoriztionHeader =  req.header['Authorization'];
      // Beaear [token]
      const token = authoriztionHeader && authoriztionHeader.split(' ')[1];
     if(!token) 
     return res.status(401).json({
            message: 'Access token not found',
            success: false
        });
    try{
     const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

     req.userId = decoded.userId
     next();
    }catch(err){
        console.log('err :>> ', err);
        return res.status(403).json({success: false, message: 'Invalid token'});
    }
    }