import { STATUS_CODES } from "http"

exports.singup = async(req:{email:'String',password:'String'},res: Express.Response,next: Express.Locals)=>{
    const {email,password}= req
    if(!email || !password)
        res.status(400).json({
            error:"Email or Password is not supplied"
        })
    else{
        res.status(201).json({
            userid: email,
            password
        })
    }
}