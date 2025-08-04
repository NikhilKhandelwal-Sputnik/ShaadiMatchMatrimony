const bcryptjs = require('bcryptjs')

const User = require('../Models/userSchema')

const registerUser = async (req, res) => {
    try {
        const { email, phoneNo, password, privacy } = req.body
        const checkEmail = await User.findOne({ email })
        const checkPhone = await User.findOne({ phoneNo })
        if (checkEmail || checkPhone) {
            return res.status(409).json({
                success: false,
                message: "Email/Phone No. already registered"
            })
        }
        const newUser = await User.create({
            email,
            phoneNo,
            password: await bcryptjs.hash(password, 10),
            privacy

        })

        return res.status(200).json({
            success: true,
            value: newUser,
            message: 'User created Succesfully'
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            value: null,
            message: 'Internal Server Error'
        })
    }
};

const userLogin = async(req, res)=>{
    
    try{
        const email = req.body.email;
        const password = req.body.password;

        const getUser = await User.findOne({email});

        if(!getUser){
            return res.status(404).json({
                success:false,
                data:null,
                message:"User Not found. Please Register.."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, getUser.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                data:null,
                message:"Invalid Password!!"
            })
        }
        loggedIn = true;
        tempUser = getUser;
        return res.status(201).json({
            success:true,
            message:"Login Successfull !!",
            data:getUser
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            data:null,
            message:"Internal Server Error"
        })
    }
};

const getUsers = async(req, res)=>{
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            value: users,
            message: 'Users fetched Succesfully'
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            value: null,
            message: 'Internal Server Error'
        })
    }
};


module.exports ={
    registerUser,
    getUsers,
    userLogin
};