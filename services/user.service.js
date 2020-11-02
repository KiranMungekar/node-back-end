const UserSchema= require('../models/UserSchema');
const mongoose = require('mongoose');


const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.addNewUser= async (newUser)=>{

    const hashedPassword= hashingThings(newUser.password)
    const user= new UserSchema({
        _id: new mongoose.Types.ObjectId(),
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword
    })
    return user.save();   
    
};

module.exports.verifyUserEmail = async ({email})=>{
   var query= UserSchema.find({'email':email});
   var user = await query.exec();
    console.log(user);
    if(user.length == 0){
         const response= {
            err:true, 
            data:'User not found'
        };
        return response;
    }else{
        const response= {
            err:false, 
            data:user[0]
        }
        return response;
    }
   
}

module.exports.verifyUserPassword= async (password,userPassword) =>{
  
    if(bcrypt.compareSync(password, userPassword)){
        const response= {
            err:false, 
            data:null
        }
        return response;
    }else{

        const response= {
            err:true, 
            data:'Password is incorrect!!!'
        }
        return response;
           
        
    }
    
}

module.exports.signingToken = async (userData) => {
    const user= {
        name: userData.get('name'),
        email: userData.get('email'),
        phone: userData.get('phone'),
        id: userData.get('_id')
    }
    
    const tokenId= jwt.sign({user},'secretKey');
    const response= {
        err:false, 
        data:tokenId
    }
    return response;
}






///Middleware

module.exports.retrieveToken= (req,res,next)=>{
    if(req.headers != null){
        const bearerToken= req.headers['authorization'];
       // console.log(req.headers);
        if(bearerToken != undefined){
          
            const bearer= bearerToken.split(' ')[1];
            req.token= bearer;
            next();
        }else{
            res.sendStatus(403);
        }
    }else{
        res.sendStatus(403);
    }
}

module.exports.verifyToken= async (req,res,next)=>{
   const authData= jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
           res.send({'msg': err.message}).status(500);
        }else{
            req.user= authData;
        }    
        next();
   });
}



function hashingThings(thing){
   const password=  bcrypt.hashSync(thing, bcrypt.genSaltSync(9));
   return password;
}