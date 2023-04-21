const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;
require('dotenv').config;

const userSchema = new Schema({
    username: {
        type:String,
        lowercase: true,
        required: [true,'Username must be provided'],
        minLength: [4,'username is short'],
        maxLength: [20,'username is too long'],
        unique:[true,'{VALUE} username already exist']
    },
    email:{
        type:String,
        required:['true','Email must be provided'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please enter a valid email"],
        unique:[true,'{VALUE} email address already exist']
    },
    password:{
        type:String,
        minLength:[3,'password too short'],
    }
});

userSchema.methods.findUsername = function(){
    return this.username;
}
userSchema.pre('save',async function(){
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.createJWT = function(){
return jwt.sign({username:this.username,userId:this._id,email:this.email},process.env.JWT_SECRET,{expiresIn:"1h"});
};

module.exports = mongoose.model('User',userSchema);