const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    }
});

userSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.password, 5, function(err, hash){
        if(err){
            console.log(err)
        }else{
            user.password = hash
            console.log(user)
            next()
        }
    })
});

module.exports = mongoose.model("user", userSchema)