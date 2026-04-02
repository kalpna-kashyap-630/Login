const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');




const signup = async (req,res) => {
    try {
        const  {name, number, email, password, confirm_password} = req.body;
        console.log("user user....",req.body);
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:'user is already exist, you can login', success:false});   
        }
        const userModel = new UserModel({name, number, email,password, confirm_password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
        .json({message: 'Signup successfully',success:true});
        
    }catch (error) {
        res.status(500)
        .json({message: 'internal server error',success:false});
    }
}
const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        console.log("get email and password : ", req.body);
        const user = await UserModel.findOne({ email });
        const errorMessage = 'Auth failed email or password is wrong';

        if (!user) {
            return res.status(401).json({
                message: errorMessage,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(401).json({
                message: errorMessage,
                success: false
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login successfully',
            success: true,
            jwtToken,
            email: user.email,
            name: user.name
        });

    } catch (error) {
        console.log("login error: ", error);
        res.status(500).json({
            message: 'internal server error',
            success: false
        });
    }
};


module.exports = {
    signup, login
}