import express from 'express'
import User from '../Modals/User.js';
import AuthenticateToken from '../Middleware/AuthenticateToken.js';
import jwt from 'jsonwebtoken';

const Auth = express();

const accessKey = process.env.JWT_ACCESS;


Auth.post('/signup' , async(req,res)=>{

      const {name , email , password} = req.body;
    try {
        const ExistingUser = await User.findOne({email:email});
        if(ExistingUser){
            res.status(200).json({valid:false});
        }
        else{
       
          const user =  await User.create({
                name:name,
                email:email,
                password:password
            })
            const ExistingUser = {
                _id:user._id,
                name:name,
                email:email,
                password:password
            }
            const accessToken = jwt.sign({ExistingUser}, accessKey, { expiresIn: "2d" });

            
            res.status(200).json({ access:accessToken, valid:true , info:ExistingUser});

        }

     
        
    } catch (error) {
        console.log(error)
    }
} )



Auth.post('/login' ,async(req,res)=>{

    const {password , email} = req.body;


    try {
     
        const ExistingUser = await User.findOne({email:email , password:password});

        if(!ExistingUser){
            res.status(200).json({valid:false});
        }
        else{
            const accessToken = jwt.sign({ExistingUser}, accessKey, { expiresIn: "2d" });
            res.status(200).json({ access:accessToken, valid:true , info:ExistingUser});
        }
        
    

        
    } catch (error) {
        console.log(error)
    }



})


Auth.get('/Token' , AuthenticateToken , async(req,res)=>{
    
    const user = req.user ;
    try {
       res.status(200).json({valid:true , Userdata:user.ExistingUser});
    } catch (error) {
        console.logI(error)
    }


} )


export default Auth
