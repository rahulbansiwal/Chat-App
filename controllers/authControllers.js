const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../model/users');


exports.signup = async(req,res,next)=>{
const user = await Users.create({...req.body});
res.status(201).json({
    user:{id:user._id,username:user.username},
    token: user.createJWT()
});

}