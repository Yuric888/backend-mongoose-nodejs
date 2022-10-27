import UserModel from '../models/UserModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
let refreshTokensList = [];
//delete User
export const deleteUser = async (req, res) => {
   try{
     const id = req.params.id
    if(id){
        await UserModel.findByIdAndDelete(id);
    }
     res.redirect('/user')
   }catch(err){
    console.log('err :>> ', err);
   }
}

export const getAllUser = async(req, res) => {
    try{
        const data = await UserModel.find();
        return res.status(200).json({
            data,
            message: "Ok",
            success: true
        })
    }catch(err){
        res.status(500).json({message: "Err can't get all users", success: false});
    }
}

export const deleteWithAuthen = async (req, res)=> {
    try{
      const user =  await UserModel.findById(req.params.id);
      res.status(200).json({user, success: true, message: "User deleted successfully"})
    }catch(err){
        console.log('err', err);
        res.status(500).json({message: `Err can't delete with ${err.message}`, success: false});
    }
}

// @DESC to register user (user, admin)

export const registerUser = async(userDesc, res) =>{
    const {email, password} = userDesc
   try{
     // Validate email
    let emailNotRegistered = await validateEmail(email);
    if(!emailNotRegistered){
        return res.status(400).json({
            message: 'Email is already taken!',
            success: false
        });
    }
    // validate confirm password
    // if(password !== confirmPassword){
    //     return res.status(400).json({
    //         message: 'Some wrong! confirm password does not match.',
    //         success: false
    //     })
    // }
    // hash password
    const hashPassword = await bcrypt.hash(password, 12);

    // create a new user
    let {confirmPassword, ...others} = userDesc
    const newUser = new UserModel({
        ...others,
        password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({
        message: 'Hurry! now you are successfully registered. Please login!',
        success: true
    })
   }catch(err){
    console.log('err', err)
      return res.status(500).json({
            message: 'Unable to create our account.',
            success: false
        })
   }
}   

const validateEmail = async email => {
    let user = await UserModel.findOne({email});
  return  user ? false : true;
}

// end register
// Generate access token
const generateAccessToken = (user)=>{
    return jwt.sign({
        userId: user._id,
        admin: user.admin
    },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '30s'
        });
}

const generateRefreshToken = (user) => {
return jwt.sign({
            userId: user._id ,
          admin: user.admin
        },
        process.env.TOKEN_REFRESH,
        {
            expiresIn: '365d'
        })
}

// @DESC to login user (user, admin);

export const loginUser = async (userDesc, res) => {
    let {email, password} = userDesc;
    
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message: 'Email is not found. Invalid login credentials.',
            success: false
        });
    }
    // we will check password
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        //sign in the token and issue it to the user
        const accessToken = generateAccessToken(user);
        // const refreshToken = generateRefreshToken(user);
        // refreshTokensList.push(refreshToken);
        //  Cookie:                                                                
        //  res.cookie("refreshToken", refreshToken,{
        //     httpOnly: true, 
        //     path: '/', 
        //     secure: false,
        //     sameSite: "strict",
        //     expires: new Date(Date.now() + 25892000000)
        // })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        const {password, ...others} = user._doc;
        const data = {...others,accessToken}
        return res.status(200).json({
            data,
            message: 'Hurry! You are now loggin in.',
            success: true
        })
    }else{
         return res.status(403).json({
            message: 'Incorrect password.',
            success: false
        });
    }
}
export const requestRefreshToken = async(req, res) => {
    // Take refresh token from user:
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message: "You're not authenticated!", success: false});
        }
        if(!refreshTokensList.includes(refreshToken)){
            return res.status(403).json({message: "Refresh token is not valid!", success: false});
        }
        jwt.verify(refreshToken, process.env.TOKEN_REFRESH, (err, user) => {
            if(err){
                console.log('err', err)
                return res.status(403).json({message: "Incorrect refresh token", success: false});
            }
            refreshTokensList = refreshTokensList.filter(token => token !== refreshToken)
            // Create new access token, refresh token
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
            refreshTokensList.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken,{
            httpOnly: true, 
            path: '/', 
            secure: false,
            sameSite: "strict"
            })
            return res.status(200).json({
                accessToken: newAccessToken,
                message: "Create new access token successfully!", 
                success: true
            })
        })
    }catch(err){
        return res.status(500).json({message: err.message, success: false})
    }
}

export const userLogout = async (req, res) => {
    try{
        res.clearCookie("refreshToken");
        refreshTokensList = refreshTokensList.filter(token => token !== req.cookies.refreshToken);

        return res.status(200).json({message: "Logged out successfully!", success: true})
    }catch(err){
        res.status(500).json({message: "Logged out failed!", success: false})
    }
}