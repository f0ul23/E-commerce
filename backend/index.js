const express = require('express');
const cors = require('cors');
require('./db/config');     //Connection
const User = require('./db/Users');       //Schema
const Product = require('./db/product');
const app = express();
require('./db/product')

const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm'

app.use(express.json());
app.use(cors());
app.post('/register',async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtkey,{expiresIn: '2h'}, (err, token)=>{
        if(err){
         res.send({result: 'something went wrong, please try after few seconds'});
        }
         res.send({result, auth:token});
     })
})

app.post('/login',async(req, res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            jwt.sign({user},jwtkey,{expiresIn: '2h'},(err, token)=>{
               if(err){
                res.send({result: 'something went wrong, please try after few seconds'});
               }
                res.send({user, auth:token});
            })
        }else{
            res.send({result:"User not found!"})
        }
    }else{
        res.send({result:"User not found!"})
    }
})

app.post('/addproduct', verifyToken, async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products',verifyToken,async(req,res)=>{
    let result = await Product.find();
    if(result.length>0){
        res.send(result);
        console.log(result)
}}
)
app.delete('/deleted/:id',verifyToken,async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get('/update/:id',verifyToken,async(req,res)=>{
    const result = await Product.findOne({_id:req.params.id})
    if(result){
    res.send(result)
    }else{
        res.send({result:"Product not found!"})
    }
})
app.put('/update/:id',verifyToken,async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result)
})
app.get('/search/:key',verifyToken,async(req,res)=>{
    let result = await Product.find({
        '$or':[
            {name: {$regex:req.params.key}},
            {category: {$regex:req.params.key}},
            {company: {$regex:req.params.key}}
        ]
})
    res.send(result)
})

//middleware - It takes three param third one takes it to the api
function verifyToken(req, res, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1]
        // console.log('middlware called', token);
        jwt.verify(token, jwtkey, (err, valid)=>{
            if(err){
                res.status(401).send({result : "Please provide valid token with header"})
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({result : "Please add authentication token with header"})
    }   //passes to the api
}
app.post('/profile',(req,res)=>{
    res.send('profile')
})
app.listen(5000);