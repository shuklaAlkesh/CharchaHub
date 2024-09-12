import mongoose from 'mongoose';
import { hash, genSalt } from 'bcrypt';


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true, "Email is required"],
        unique: true,
        // match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required:[true, "Password is required"],
        // unique: true,
    },
    firstName: {
        type: String,
        required:false,
    },
    lastName: {
        type: String,
        required:false,
    },
    image: {
        type: String,
        required:false,
    },
    color: {
        type: Number,
        required:false,
    },
    profileSetup:{
        type: Boolean,
        default: false,
    },
});

// 1:06:04

// Bcrypt the password
// userSchema.pre("save", async function(next){
//     const salt = await genSalt();
//     this.password = await hash(this.password,salt);
//     next();
// });

// const user = mongoose.model('User', userSchema);

// export default user;

userSchema.pre("save", async function(next){
    if (this.isModified("password")) { // Only hash the password if it has been modified or is new
        const salt = await genSalt();
        this.password = await hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;