const express = require("express");
const app = express();
const port = 27017;
const connectDB = require('./db/connect');


const userRouter = require('./routes/user');


const path = require("path");
const ejs = require("ejs");

app.set('view engine','ejs')

app.use("/",express.static(path.resolve('assets/css')))
app.use(express.urlencoded({extended:true}))

app.use(userRouter)

app.all("*",(req,res)=>{
    console.log(req.url)
    res.status(400).send("Page not found")
});


const start = async () =>{
    try{
        await connectDB("mongodb://127.0.0.1:27017/user");
        console.log('Connected to DB');
        app.listen(port,()=>{
            console.log(`connected to port ${port}`);
        });
    }catch(error){
        console.log(error);
    }
    

    
}

start();


