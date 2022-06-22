const jwt = require ('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config({ path: '../config/dev.env' })


const auth = async(req,res,next)=>{

    try {
        const authToken = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(authToken,process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id:decoded._id,'tokens.authToken':authToken})
        // console.log(user);

        if(!user){
            throw new Error();
        }

        req.token =  authToken
        req.user = user
        next()
    } 
    catch(e){
        res.status(401).send({Error:"Please Authenticate"})
    }
}

module.exports = auth;