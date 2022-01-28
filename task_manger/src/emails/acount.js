const sqmail=require('@sendgrid/mail')
const authtoken=process.env.SEND_GRID_API_AUTH
sqmail.setApiKey(authtoken)
const sendWelcomeMail=(email,name)=>{
    const mail={
        from:process.env.EMAIL,
        to:email,
        subject:"Thanks for joing in!",
        html:`Welcome to the <b>Reviews</b> app,${name}<br>
        <p>This app helps you to find the right place in any location and makes you buy anything with the best quality and price. </p><br>
        Thanks,<br>
        The Reviews Team`

    }
    
    sqmail.send(mail,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("mail Sent!")
        }
    })

}
const sendCancelMail=(email,name)=>{
    const mail={
        from:process.env.EMAIL,
        to:email,
        subject:"See you soon!",
        html:`Goodbye, ${name}.<br>
        <p> I hope to see you back sometime soon.</p> <br>
        Thanks,<br>
        The Reviews Team`


    }
    
    sqmail.send(mail,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("mail Sent!")
        }
    })

}

module.exports={
    sendWelcomeMail,
    sendCancelMail
}


