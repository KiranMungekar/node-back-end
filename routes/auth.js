
const router= require('express').Router();

//DB services
const userService =require('../schema/users/user.service');


    /// API ROUTES

    router.post('/test', (req,res)  => {
        res.send('Wow its working.');
    })

    router.post('/register',(req,res)  => {
        if(req.body != null){
            try{
                registerNewUser(req.body).then(user=>{
                    if(user.err){
                        res.send({
                            err:true,
                            msg:'User already registered!!!'
                        }).status(200);
                        
                    }else{
                        userService.signingToken(user.data).then(token=>{
                            res.send({
                                err:false,
                                token:token['data']
                            }).status(200);
                        });
                       
                    }
                    
                });
            }catch(err){
                console.error(err);
                res.status(500).send({
                    err:true,
                    'msg':err.msg
                });
            }
        } 
    });
    

    router.post('/login',  (req,res,next)=>{
       
            if(req.body.email != undefined && req.body.password != undefined){
                try{
                   const response= verifyUser(req.body).then(response=>{
                        if(response.err){
                            res.status(404).send({
                                err: response.err,
                                msg: response.data
                            })
                        }else{
                            res.status(200).send({
                                err:false,
                                token: response.data
                            })
                        }
                    })
                }catch(err){
                    console.error(err.stack);
                    res.status(404).send({
                        err:true,
                        msg:err.message
                    });
                }
            }else{
                res.status(404).send({
                    err:true,
                    msg:'No data received'
                });
            }
    });


    ///Auth Methods;
    const registerNewUser= async (newUser) => {
        try{
            const isUserPresent= await userService.verifyUserEmail(newUser);
            if(isUserPresent.err){
                return isUserPresent;
            }else{
                console.log(newUser);
                const res= await userService.addNewUser(newUser);  
                console.log(res);
                return {
                    err:false,
                    data:res
                };
            }
           
        }catch(err){
            console.error(err.stack);
            return err;
        }
    
    }

    const verifyUser= async (body)=>{
        try{
            const userData= await userService.verifyUserEmail(body);
            if(userData.err){
                return userData;
            }else{
                const matchData= await userService.verifyUserPassword(body.password, userData.data.password);
                if(matchData.err){
                    return matchData;
                }else{
                    return userService.signingToken(userData.data);
                }
            }
        }catch(err){
            console.log(err.stack);
            return {
                err:true,
                data:err.message
            }
        }   

    }




module.exports= router;