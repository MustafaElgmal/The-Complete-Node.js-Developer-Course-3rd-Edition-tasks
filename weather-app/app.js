const geocoding=require('./utils/geocoding')
const forcast=require('./utils/forcast')


const address=process.argv[2]
if(!address){
    console.log("please provied address!")

}else{
    geocoding(address,(error,{latitude,longitude,location})=>{
        if(error){
            return console.log(error)
        }
    
        forcast(latitude,longitude,(error,{temperature,feelslike})=>{
        if(error){
            return console.log(error)
        }
    
        console.log(location)
        console.log(`Temperature is ${temperature}`)
        console.log(`Feelslike are ${feelslike}`)
                
                  
        
    
    })
    })

}








