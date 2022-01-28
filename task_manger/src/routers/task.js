
const express = require('express')
const auth=require('../middleware/auth')
const pagination=require('../middleware/pagination')
const Task = require('../models/task')

const router = new express.Router()



router.post('/tasks/me',auth, async (req, res) => {
    const task=new Task({
        ...req.body,
        onwer:req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)

    } catch (error) {
        res.status(404).send(error)

    }


})
router.get('/tasks/me',auth,pagination, async (req, res) => {
    

    try {
        
        res.status(200).send(res.pagination)

    } catch (error) {
        res.status(500).send(error)

    }
})

router.get('/tasks/me/:id', auth,async (req, res) => {
    
    try {
        const task = await Task.findOne({_id:req.params.id,onwer:req.user._id})
        if (!task) {
            return res.status(401).send("Not found this task!")
        }
        res.status(200).send(task)


    } catch (error) {
        res.status(500).send(error)

    }

})


router.patch('/tasks/me/:id',auth, async (req, res) => {
    const ubdates = Object.keys(req.body)
    const allowUbd = ["description", "completed"]
    const IsvaildUb = ubdates.every((ubdate) => allowUbd.includes(ubdate))
    if (!IsvaildUb) {
        return res.status(400).send("Not allowed to ubdate this key!")
    }
    const _id = req.params.id
    try {
        
       const task=await Task.findOne({_id:req.params.id,onwer:req.user._id})
        if (!task) {
            return res.status(404).send("Not found this task!")
        }
        ubdates.forEach((ubdate)=> task[ubdate]=req.body[ubdate])
        await task.save()
        res.status(200).send(task)

    } catch (error) {
        res.status(500).send("fkdlsk")

    }
})

router.delete('/tasks/me/:id',auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id,onwer:req.user._id})

        if (!task) {
            return res.status(404).send("Not found this task")
        }
        res.send(task)

    } catch (error) {
        res.status(500).send(error)

    }
})
router.delete('/tasks/me/deleteall',auth,async(req,res)=>{
    try{
        await Task.deleteMany({onwer:req.user._id})

    }catch(e){
        res.status(500).send(e)
    }

})

module.exports = router