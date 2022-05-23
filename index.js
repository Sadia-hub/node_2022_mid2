const express = require("express");
const app = express();
const port = 27017;
const connectDB = require('./db/connect');

const cutomerRouter = require('./routes/customer');
const userRouter = require('./routes/user');

require("dotenv").config();
const path = require("ejs");
const ejs = require("ejs");

app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(cutomerRouter);
app.use(userRouter)

// app.get("/",(req,res)=>{
//     res.render('login',{title:"Login"});
// });


// app.use("/", userRouter)

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


