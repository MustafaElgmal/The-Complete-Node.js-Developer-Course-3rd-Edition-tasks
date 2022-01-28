const fs = require('fs')

// const book = {
//     title: "Algorithms",
//     authour: "Mostafa Elgmal"
// }

// const bookJeson = JSON.stringify(book)

// fs.writeFileSync('1-json.json', bookJeson)

// const databuffer = fs.readFileSync('1-json.json')
// const data=databuffer.toString()
// const datajson=JSON.parse(data)


//  console.log(datajson.title)

// challenge-----------------------------------\\

const databuffer =fs.readFileSync('1-json.json')
const datajson=databuffer.toString()
const data=JSON.parse(datajson)

 data.name="Mostafa"
 data.age=23

 const user=JSON.stringify(data)

fs.writeFileSync('1-json.json',user)

