//here we'll create log in and sign up logic
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        //we'll check if there is already a user with that email
        const user = await userModel.findOne({email}) //if already an account exists with that email, then that account will be stored in this user variable
        
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            return res.json({success:"false",message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:"true",token})

    } catch (error) {
        console.log(error)
        res.json({success:"false",message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res) => {
    const {name, password, email} = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({email}) //if an email is existing for an account, then the account will be stored here 
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing user password
        //now we'll encrypt the password using the bcrypt imported
        const salt = await bcrypt.genSalt(10) //we can set this from 5 to 15. 15 is the strongest but it will take more time for encryption
        const hashedPassword = await bcrypt.hash(password,salt) //now the password will be hashed and stored in the hashedPassword variable

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) { 
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}