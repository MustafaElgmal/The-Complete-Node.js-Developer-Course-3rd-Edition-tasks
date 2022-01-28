const generateMassage=(message)=>{
    return{
        message,
        time:new Date().getTime()
    }
    
}

module.exports={
    generateMassage
}
