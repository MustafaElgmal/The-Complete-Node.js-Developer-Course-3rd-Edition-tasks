
const express = require('express')
const userrouter=require('./routers/user')
const taskrouter=require('./routers/task')

require('./db/mongoose')
 
const app = express()
const port = process.env.PORT



app.use(express.json())
 app.use(userrouter)
 app.use(taskrouter)


app.listen(port, () => {
    console.log("Server is up on port " + port)

})








