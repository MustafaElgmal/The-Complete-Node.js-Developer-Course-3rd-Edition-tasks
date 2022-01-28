const Task=require('../models/task')

const pagination=async(req,res,next)=>{
    const page=parseInt(req.query.page)
    const limit=parseInt(req.query.limit)
    const startIndx=(page-1)*limit
    const endIndx=page*limit
    const results={}
    try{
        let tasks = await Task.find({onwer:req.user._id})
        if(req.query.completed){
            tasks=tasks.filter((task)=>task.completed===JSON.parse(req.query.completed))

        }
    
        if(req.query.description){
            tasks=tasks.filter((task)=>task.description===req.query.description)
        }
        if(startIndx>0){
            results.previous={
                page:page-1,
                limit

            }
        }
        if(endIndx<tasks.length){
            results.next={
                page:page+1,
                limit
            }
        }
        results.results=tasks.slice(startIndx,endIndx)
        res.pagination=results
        next()


        

    }catch(e){

    }


}

module.exports=pagination