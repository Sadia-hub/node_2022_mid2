const userModel = require("../db/models/User")
const becrypt = require("bcrypt")

//Pages
const login_page = (req,res)=>{
    res.render("login",{title:"Login"});
}

const signup_page = (req,res) =>{
    res.render("signup",{title:"Sign Up Page"})
}

const users_page = async(req, res) =>{
    try{
        

        const users = await userModel.find({})
        res.render("users",{title:"Users", users})
        console.log(users)
    }
    catch(error){
        console.log(error)
    }
}

const getUser = async (req, res) =>{
    console.log(req.body)

    let {password, name, email} = req.body

    

    const user = await userModel.findOne({email:req.body.email})
    if(!user){
        return res.send("Either username or password is not available")
    }
    becrypt.compare(password, user.password, (error, matched)=>{
        if(error){
            return res.send("Either username or password is not available")
        }
        console.log(user)
        res.render("user",{name:user.name, email:user.email,})
    })
    
}


const insert_user = async (req, res) =>{
    try{
        console.log(req.body)
        const user = await userModel.create(req.body)
        console.log(user)
        //res.send("insert user")
        res.redirect("/")
    }catch(error){
        console.log(error)
    }
    
}


const getUserById = async (req, res) =>{
    try{
        const {id} = req.params;
        const user = await userModel.findById({_id:id})
        if(user){
            // return res.render("user",{name:user.name,email:user.email})
            return res.render("Edit",{title:"User Data", name:user.name, email:user.email, password:user.password, id:user._id, action:"edit"})
        }
        res.send("No Such User")
    }catch(error){
        console.log(error)
    }
    

}

const updateUserById = async (req, res) =>{
    const {id} = req.params

    try{
        const user = await userModel.findByIdAndUpdate({_id:id},req.body,{
            runValidators:true,
            new:true
        })
        console.log(user)
        res.redirect("/users")
    }catch(error){
        console.log(error)
    }
    
}

const deleteUserById = async(req, res)=>{

    try{
        const {id} = req.params
        const user = await userModel.findByIdAndDelete({_id:id})
        if(user){
            res.redirect("/users");
        }else{
            res.send("Action Failed")
        }
    }catch(error){
        console.log(error)
    }
    

}

module.exports = {login_page, signup_page, insert_user, getUser, users_page, updateUserById, deleteUserById, getUserById}