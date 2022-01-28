// setTimeout(()=>{
//     console.log("Two second is run")

// },2000)

// const names=['mostafa','adel','ahmed','mahmoud']
// const shourtNames=names.filter((name)=>name.length<=5)

// const geocoding=(address,callback)=>{
//     setTimeout(()=>{
//         const data={
//             latitude:0,
//             longtitude:0
//         }
//         callback(data)

//     },2000)

// }

// geocoding('Phildaia',(data)=>{
//     console.log(data)

// })



// Challenge---------------------------------------------------

const sum=(a,b,callback)=>{
    setTimeout(()=>{
        const add=a+b
        callback(add)

    },2000)
   

}

sum(1,2,(add)=>{
    console.log(add)
})





 