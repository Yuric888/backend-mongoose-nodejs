import UserModel from '../models/UserModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

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


// @DESC to register user (user, admin)

export const registerUser = async(userDesc, role, res) =>{
   try{
     // Validate email
    let emailNotRegistered = await validateEmail(userDesc.email);
    if(!emailNotRegistered){
        return res.status(400).json({
            message: 'Email is already taken!',
            success: false
        });
    }
    // hash password
    const hashPassword = await bcrypt.hash(userDesc.password, 12);

    // create a new user
    const newUser = new UserModel({
        ...userDesc,
        password: hashPassword,
        role
    });
    await newUser.save();
    return res.status(200).json({
        message: 'Hurry! now you are successfully registered. Please login!',
        success: true
    })
   }catch(err){
        console.log('err :>> ', err);
        res.status(500).json({
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

// @DESC to login user (user, admin);

export const loginUser = async (userDesc, role, res) => {
    let {email, password} = userDesc;
    
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message: 'Email is not found. Invalid login credentials.',
            success: false
        });
    }
    // we will check role
    if(user.role !== role){
         return res.status(403).json({
            message: 'Please make sure you are logging in from the right portal role.',
            success: false
        });
    }
    // we will check password
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        //sign in the token and issue it to the user
        let token = jwt.sign({
          userId: user._id ,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '7 days'
        });
        // const products = await ProductsBuy.find(user.})
        let result = {
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
            expiresIn: 168
        }
        return res.status(200).json({
            ...result,
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