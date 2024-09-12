import User from '../models/UserModal.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {renameSync , unlinkSync} from "fs";


// Token will be valid for 15 days
const maxAge = 15 * 24 * 60 * 60;

const createToken = (email, userId) =>{
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
}

export const signup = async (request,response,next) => {
    try{
        const {email,password} = request.body;
        if(!email || !password) {
            return response.status(400).send("Email and Password are required");
        }

        const user = await User.create({email,password});

        response.cookie("jwt", createToken(email,user.id),{
            maxAge: maxAge * 1000,
            secure: true,
            sameSite:"None",
        });
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            },
        })
    }catch(error){
        console.log({error});

       // Handle duplicate email error
        if (error.code === 11000) {
            return response.status(400).send("Email already in use");
        }

        return response.status(500).send("Internal Server Error");
    }
};


export const login = async (request,response,next) => {
    try{
        const {email,password} = request.body;
        if(!email || !password) {
            return response.status(400).send("Email and Password are required");
        }

        // console.log("Request Body:", request.body); // To see what's being received
        const user = await User.findOne({ email });
        // console.log("User Found:", user); // To check if a user is found

        if(!user){
            return response.status(400).send("User with the give Email and Password are not found");
        }

        const auth = await bcrypt.compare(password,user.password);

        if(!auth){
            return response.status(400).send("Password is incorrect");
        }

        response.cookie("jwt", createToken(email,user.id),{
            maxAge: maxAge * 1000,
            secure: true,
            sameSite:"None",
        });
        return response.status(200).json({ // 201 - status 200 for ok response
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName : user.firstName,
                lastName : user.lastName,
                image : user.image,
                color : user.color,
            },
        })
    }catch(error){
        console.log({error});

       // Handle duplicate email error
        if (error.code === 11000) {
            return response.status(400).send("Email already in use");
        }

        return response.status(500).send("Internal Server Error");
    }
};

export const getUserInfo = async (request,response,next) => {
    try{
        // console.log(request.userId);
         const userData = await User.findById(request.userId);

        if(!userData){
        return response.status(400).send("User with the give Id not found.");
        }
        

        return response.status(200).json({ // 201 - status 200 for ok response
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName : userData.firstName,
            lastName : userData.lastName,
            image : userData.image,
            color : userData.color,
        });
    }catch(error){
        console.log({error});

       // Handle duplicate email error
        if (error.code === 11000) {
            return response.status(400).send("Email already in use");
        }

        return response.status(500).send("Internal Server Error");
    }
};

// updateProfile

export const updateProfile = async (request,response,next) => {
    try{
        // console.log(request.userId);
        const {userId} = request;
        const {firstName, lastName, image, color} = request.body;
        if(!firstName || !lastName ){
            return response.status(400).send("FirstName LastName and color is required.");
        }
        const userData = await User.findByIdAndUpdate(
        userId,
        {
            firstName,
            lastName,
            color,
            profileSetup: true,
        },
        {
            new: true,
            runValidators: true,
        }
    );
        

        return response.status(200).json({ // 201 - status 200 for ok response
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName : userData.firstName,
            lastName : userData.lastName,
            image : userData.image,
            color : userData.color,
        });
    }catch(error){
        console.log({error});

       // Handle duplicate email error
        if (error.code === 11000) {
            return response.status(400).send("Email already in use");
        }

        return response.status(500).send("Internal Server Error");
    }
};


export const addProfileImage = async (request,response,next) => {
    try{
        // console.log(request.userId);
        if(!request.file){
            return response.status(400).send("File is required.");
        }

        const date = Date.now();
        const fileName = "uploads/profiles/" + date + request.file.originalname;
        renameSync(request.file.path,fileName);

        const updateUser = await User.findByIdAndUpdate(
            request.userId,
            {image : fileName},
            {new : true,runValidators:true}
        );


        return response.status(200).json({ // 201 - status 200 for ok response
            image : updateUser.image,
        });
    }catch(error){
        console.log({error});

       // Handle duplicate email error
        if (error.code === 11000) {
            return response.status(400).send("Email already in use");
        }

        return response.status(500).send("Internal Server Error");
    }
};



export const removeProfileImage = async (request,response,next) => {
    try{
        // console.log(request.userId);
        const {userId} = request;
        const user = await User.findById(userId);

        if(!user){
            return response.status(404).send("User not found");
        }

        if (user.image) {
            unlinkSync(user.image); // for removing the image
        }
        user.image = null;
        await user.save();

        return response.status(200).send("profile image remove successfully");
    }catch(error){
        console.log({error});

       // Handle duplicate email error
        if (error.code === 11000) {
            return response.status(400).send("Email already in use");
        }

        return response.status(500).send("Internal Server Error");
    }
};

export const Logout = async (request,response,next) => {
    try{
        response.cookie("jwt","", {
            maxAge:1,
            secure:true,
            sameSite:"None"
        })
        return response.status(200).send("Logout successfull");
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
};