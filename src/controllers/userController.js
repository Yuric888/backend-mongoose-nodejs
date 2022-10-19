import UserModel from '../models/UserModel.js'
import bcrypt from 'bcryptjs'


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