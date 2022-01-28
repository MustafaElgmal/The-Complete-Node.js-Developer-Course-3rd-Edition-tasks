const {generateMassage}=require('')
const socket =io()
const $messageForm=document.querySelector('#massage-form')
const $messageFormInput=document.querySelector('input')
const $messageFormButton=document.querySelector('button')
const $button=document.querySelector('#send-location')
const $messages=document.querySelector('#massage')
const $messageTemplate=document.querySelector('#massage-template').innerHTML
const $locationTemplate=document.querySelector('#location-template').innerHTML
socket.on('massage',(msg)=>{
    console.log(msg.message)
    const html=Mustache.render($messageTemplate,{message:msg.message})
    $messages.insertAdjacentHTML('beforeend',html)

})
socket.on('location',(url)=>{
    console.log(url)
    const html=Mustache.render($locationTemplate,{url})
    $messages.insertAdjacentHTML('beforeend',html)

})


document.querySelector('#massage-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    $messageFormButton.setAttribute('disabled','disabled')
    const message=e.target.elements.input.value
    // e.target.elements.input.value=" "
    socket.emit('SendMassage',{message},(error)=>{
         $messageFormButton.removeAttribute('disabled')
         $messageFormInput.value=' '
         $messageFormInput.focus()
        if(error){
            return console.log(error)
        }

        console.log("Message Delivert!")
    })
    
})

document.querySelector('#send-location').addEventListener('click',(e)=>{

    if(!navigator.geolocation){
        return alert("Your browser is bad!")
    }
    $button.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        
         socket.emit('SendLocation',{latitude:position.coords.latitude,logitude:position.coords.longitude},()=>{
             console.log("Location Shared!")
         })

    })

    $button.removeAttribute('disabled')
   

})

