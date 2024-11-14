const bcrypt = require('bcrypt');
const UserRegister = require('../models/register');
const nodemailer = require('nodemailer');
require('dotenv').config();  

const createNewUser = async (req, res) => {
    const body = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (
        !body ||
        !body.userName ||
        !body.email ||
        !body.password ||
        !body.confirmPassword
    ) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    if (body.password !== body.confirmPassword) {
        return res.status(400).json({ msg: "Password and confirm password do not match" });
    }

    if (!emailRegex.test(body.email)) {
        return res.status(400).json({ msg: "Email is in invalid format" });
    }

    try {
        const existingEmail = await UserRegister.findOne({ email: body.email });
        if (existingEmail) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await UserRegister.create({
            userName: body.userName,
            email: body.email,
            password: hashedPassword,
        });

        
        await sendRegisteredUser(body.email);

        return res.status(201).json({ msg: "Success" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// const loginUser = async (req,res) => {
//     const {email, password} = req.body;

//     if(!email || !password) {
//         return res.status(400).json({msg: "email and password are required"});
//     }

//     try {
//         const user = await UserRegister.findOne({email});

//         if(!user || !()) {
//             return res.status(400).json({})
//         }
//     }
// }

const sendRegisteredUser = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Successfully registered',
        text: 'Successfully registered in 2048 gaming app',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending mail:", error);
    }
};

module.exports = { createNewUser };
