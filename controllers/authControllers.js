const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../model/users');
const  {StatusCodes} = require('http-status-codes');


exports.signup = async(req,res,next)=>{
const user = await Users.create({...req.body});
res.status(StatusCodes.CREATED).json({
    user:{id:user._id,username:user.username}
});
}

exports.login = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(StatusCodes.BAD_REQUEST).json({
            reason:"Email id or password is not provided"
        });
    }
    let user;
    if(!email.includes("@")){
        console.log("checking with username");
        user = await Users.findOne({username:email});
    }
    else{
        user = await Users.findOne({email});
    }
     
     console.log(user);
    if(!user){
        res.status(StatusCodes.BAD_GATEWAY).json({
            reason:`${email} is not available`,
            signup: '/auth/signup'
        })
    }
    const pwdCheck = await bcrypt.compare(password,user.password);
    if(!pwdCheck){
        res.status(StatusCodes.BAD_REQUEST).json({
            reason:'Incorrect password'
        })
    };
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        reason:"loggedIn",
        token
    });

}