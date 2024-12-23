import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRETKEY;
class AuthController {
    // function for handling registeration.
     static async authRegister(req, res){
        const {userName, email, password} = req.body;
        try {
            // or operator return a user matched with either of username or email
            const checkUser = await User.findOne({
                $or:[
                    {userName},{email}
                ]
            });
            
            if(checkUser){
                return res.json({
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
            const user = await User.findOne({email});
            if(!user){
                return res.json({success:false, message:"Either email or password do not match"})
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if(!comparePassword){
                return res.json({
                    success:false,
                    message:"Credendials do not match"
                })
            }
            // create token
            const token = jwt.sign({
                id:user._id, role:user.role, email:user.email
            }, secretKey, {expiresIn:"60m"});

            // extract user info excluding the password
            const {password:pas, ...rest} = user._doc;
            
            // sending cookie with response
            res.cookie('token', token, {httpOnly:true, secrue:false}).status(200).json({
                success:true,
                message:"Logged in successfully",
                user:rest
            })

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Some thing went wrong please try leter."
            })
            
        }
    }

   

    // function to verify user authentication
    static async authMiddleware(req, res, next){
        const token = req.cookies.token;
        if(!token) return res.status(401).json({success:false, message:"Unathorized user"});
        
        try {
            jwt.verify(token, secretKey, (err,user)=>{
                if(err) return res.status(401).json({success:false, message:"Unathorized user"});
                res.status(200).json({success:true, message:"Authenticated user", user})
                next();
            })

            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(500).json({success:false, message:"Unathorized user"})
        }
    }

     // logout function
     static async authLogout(req, res){
        try {
            res.clearCookie("token").status(200).json({
                success:true,
                message:"Logged out successfully"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
            
        }
    }
}

export default AuthController;

