
const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const Filter=require('bad-words')
const {generateMassage}=require('./utiles/message')
const app=express()
const server=http.createServer(app)
const port=process.env.PORT||3000
const publicDirectoryPath=path.join(__dirname,'../public')
const io=socketio(server)

app.use(express.json())
app.use(express.static(publicDirectoryPath))

io.on('connection',(socket)=>{
    console.log("New client!")
    socket.emit('massage',generateMassage("Welcome!"))
    socket.broadcast.emit('massage',generateMassage("A new member has joined!"))

    socket.on('SendMassage',(msg,callback)=>{
        const filter=new Filter()
        if(filter.isProfane(msg)){
            
            return callback("Profanty is not allowed!")
        }
        io.emit('massage',msg)
        callback()
    })
    socket.on('SendLocation',(Loc,callback)=>{
        io.emit('location',`https://google.com/maps?q=${Loc.latitude},${Loc.logitude}`)
        callback()
    })


    socket.on('disconnect',()=>{
        io.emit('massage',generateMassage("A user has left!"))
    })

    
})


server.listen(port,()=>{
    console.log("Server is running on port "+ port)
})


// // First challenge

// Goal:Create an express web Server
// 1.init npm and install express

// npm init 
// npm i express
// const express=require('express')
// const app=express()
// const port=process.env.PORT||3000

// 2.setub a new express Server
// _serve up the public dirctory

// const path=require('path')
// const publicdircory=path.join(__dirname,'../public')
// app.use(express.static(publicDircotyr))

// _Listen port 3000

//  app.listen(port,()=>{
//     console.log("Server is running on port "+ port)
// })

// 3-Create index.html and render "chat APP" on screen
