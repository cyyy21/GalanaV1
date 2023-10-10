import express from 'express';
import bodyParser from 'body-parser'
import User from './Model/User.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors'
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(cors())
app.set('port', PORT);
await mongoose.connect('mongodb://127.0.0.1:27017/Galana')

// Add your middleware
app.use(bodyParser.json());


app.post('/register', async (req, res) => {
  try {
    const { userName, password } = req.body;

    const encrypted = await bcrypt.hash(password, 10);
    const alreadyRegister = await User.findOne({userName});

    if(alreadyRegister) {
      return res.status(403).send({
        message:'Username Already Exist!'
      });

    }
    const newUser = await User.create({
      userName,
      password: encrypted
    });

    res.status(201).json({
      message: `${userName} as Username has been created`
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//LOGIN 

const secretKey = process.env.SECRET_KEY;
app.post('/login', async(req,res) => {
try{
  const {userName,password} = req.body;

  //to find user if existing;
  const user = await User.findOne({userName});
  if(!user){
  return  res.status(401).json({
      message:'Username doesnt exists'
    })
  }
  const passMatch = await bcrypt.compare(password, user.password);
  
  if(!passMatch) {
 return res.status(401).json({message:"Incorrect password"});
  }
 

const token = jwt.sign({
  id:user._id,
  userName: user.userName,
},
secretKey,
{expiresIn: '24hr'});

return res.status(200).send({
 
  message:`Welcome to Galana`,
  token,
});

}
catch (error) {
  console.log(error)
  res.status(500).json({ message:'internal server error' })
} });
//CHECK IF THE TOKEN IS VALID ;

app.get('/isTokenValid', async (req,res)=> {
  try {
    //checking the value of authorization
   const auth = req.headers.authorization;
   if(!auth) {
   return res.status(401).json({
      message : "No Token Provided"
    })
 
   };
//verify the token if Valid 

const [,token] = auth.split(' '); //skip the bearer  only get the token

const payload = await jwt.verify(token,secretKey);
res.status(200).json({
  message:`${payload.userName}`
})

  } catch (error) {
    console.log(error)
  }
})
//get UserInfo : 
app.get('/users', async (req,res) => {
  const users = await User.find();
  res.status(200).json({
    message:users
  })
})

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
