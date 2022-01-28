// For CRUD Create Read Ubdate Delete
// import mongodb
const { MongoClient, ObjectID } = require('mongodb')

// connection URL
const connectionUrl = "mongodb://127.0.0.1:27017"
// const MongoClient=mongodb.MongoClient
// const client=new mongodb.MongoClient(connectionUrl)

// databaseName
const databaseName = "task-manger"


MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, clinet) => {
    if (error) {
        return console.log("Unable to connect to database")
    }

    const db = clinet.db(databaseName)
    // db.collection('users').findOne({_id:new ObjectID("61b613a29b014bae169bd234")},(error,user)=>{
    //     if(error){
    //         return console.log("Unable to fetch")
    //     }

    //     console.log(user)
    // })

    // db.collection("users").find({age:22}).toArray((error,users)=>{
    //     if(error){
    //         return console.log("Unable to fetch")
    //     }

    //     console.log(users)
    // })

    // db.collection('tasks').findOne({_id:new ObjectID("61b61a272be1cb2d1cd70153")},(error,task)=>{
    //     if(error){
    //         return console.log("Unable to fetch this task!")
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
    //     if(error){
    //         return console.log("Unable to fetech!")
    //     }
    //     console.log(tasks)
    // })

    // db.collection('users').updateOne({_id:new ObjectID("61b6179fd2bb3afe13b9ec25")},{
    //     $inc:{
    //         age:0
    //     }
    // },(error,result)=>{
    //     if(error){
    //         return console.log("Unable to ubdate!")

    //     }
    //     console.log(result)


    // })

    // db.collection('tasks').updateMany({},{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result)

    // }).catch((error)=>{
    //     console.log(error)

    // })


    // db.collection('users').deleteMany({age:22}).then((result)=>{
    //     console.log(result)

    // }).catch((error)=>{
    //     console.log(error)


    // })

    db.collection('tasks').deleteOne({ descraption: "Go to the gym" }).then((result) => {
        console.log(result)

    }).catch((error) => {
        console.log(error)

    })



})