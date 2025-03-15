const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        unique:true,
        maxLength:[30,"Name Cannot Exceed"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    avatar:{
            key:{
             type:String,
            },
            url:{
             type:String,
            }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt :{
        type: Date,
        default : Date.now
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    },
    isVerified:{
        type:Boolean,
        default : false
    }
});


// Password Hashing using BcryptJs before storing it into database
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();    
    }

    this.password = await bcrypt.hash(this.password,10);
});

// Method to get JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
};

// Method to Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};

// Method to Generating Token using crypto
userSchema.methods.getResetPasswordToken = function (){

    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = new mongoose.model("users",userSchema);
