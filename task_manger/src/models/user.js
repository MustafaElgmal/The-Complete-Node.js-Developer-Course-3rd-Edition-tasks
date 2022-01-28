
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task = require('../models/task')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" Email is invaild!")

            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password does not contain Password")
            }

        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age should be positive number")
            }
        }
    },
    image:{
        type:Buffer
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
userSchema.methods.getGenerateAuthentekation=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}
userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.image
    return userObject
}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("Invailad Email!")
    }
    const IsMatch=await bcrypt.compare(password,user.password)

    if(!IsMatch){
        throw new Error("Invaild Password!")
    }

    return user
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
       user.password= await bcrypt.hash(user.password,8)

    }
    next()

})
userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({onwer:user._id})
    next()
})



const User=mongoose.model('User',userSchema)

module.exports=User
 

