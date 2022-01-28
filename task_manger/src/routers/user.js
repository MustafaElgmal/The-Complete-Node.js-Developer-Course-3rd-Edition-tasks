const express = require('express')
const User = require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')
const {sendWelcomeMail,sendCancelMail}=require('../emails/acount')

const router=new express.Router()



router.post('/users',async(req, res) => {
    const user = new User(req.body)
    try{
       
        await user.save()
        const token=await user.getGenerateAuthentekation()
        sendWelcomeMail(req.body.email,req.body.name)
        res.status(201).send({user,token})

    }catch(error){
        res.status(404).send(error)

    }

   
})
router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.getGenerateAuthentekation()
        res.status(200).send({user,token})
        

    }catch(error){
        res.status(400).send(error)
    }
})


router.get('/users/me', auth,async(req, res) => {

    res.send(req.user)


})

router.patch('/users/me',auth,async(req,res)=>{
    const ubdates=Object.keys(req.user)
    const allowUbd=["name","age","email","password"]
    const Isvaildallow=ubdates.every((ubdate)=>allowUbd.includes(ubdate))
    if(!Isvaildallow){
        return res.status(400).send("Not allow to ubdate this key")
    }
    
    try{
        
        ubdates.forEach((ubdate)=>req.user[ubdate]=req.body[ubdate])
        await req.user.save()
        res.send(req.user)


    }catch(error){
        res.status(500).send(error)

    }
})

router.delete('/users/me',auth,async(req, res)=>{
    try{

       await req.user.remove()
       sendCancelMail(req.user.email,req.user.name)
        res.send(req.user)

    }catch(error){
        res.status(500).send(error)

    }
})


router.post('/users/me/logout',auth,async(req,res)=>{

    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
            
        })

        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()

    }

})
router.post('/users/me/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }

})

const upload=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cd){
        if(!file.originalname.match(/\.(jpg||jpeg||png)$/)){
            return cd(new error('Please upload an image!'))
        }
        cd(undefined,true)
    }
})

router.post('/users/me/image',auth,upload.single('image'),async(req,res)=>{
    try{
        const buffer=await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        req.user.image=buffer
        await req.user.save()
        res.send()


    }catch(e){
        res.status(400).send(e)
    }


})

router.get('/users/:id/image',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user||!user.image){
            throw new Error('No content!')

        }
        res.set('Content-Type','image/jpg')
        res.status(200).send(user.image)

    }catch(e){
        res.status().send(e)
    }

})

router.delete('/users/me/image',auth,async(req,res)=>{
    req.user.image=undefined
    await req.user.save()
    res.send()

})

module.exports=router