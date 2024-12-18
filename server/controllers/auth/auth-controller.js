import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class AuthController {
    // function for handling registeration.
     static async authRegister(req, res){
        const {userName, email, password} = req.body;
        try {
            // or operator return a user matched with either of username or email
            const user = await User.findOne({
                $or:[
                    {userName},{email}
                ]
            });
            // console.log(user);
            
            if(user){
                return res.status(200).json({
                    success:false,
                    message:"Either username or email is alreay used please try another one."
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12);
        

        const newUser = await User.create({
            userName, email, password:hashedPassword
        })
        res.status(201).json({
            success:true,
            message:"Registration successful"
        })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Some error occured"
            })
            
        }
    }

    // function to handle login functionality
    static async authLogin(req, res){
        const {email, password} = req.body;
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Invalid credentials."
            })
            
        }
    }
}

export default AuthController;

