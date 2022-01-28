
const request=require('request')

const forcast=(latitude,longtude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=0a739b7a2ea352b86d7c3957ddb51fb5&query=`+latitude+`,`+longtude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect weather servece!",undefined)

        }else if(body.error){
            callback(resp.body.error.info,undefined)

        }else{
            callback(undefined,{
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            })

        }
    })

}

module.exports=forcast
