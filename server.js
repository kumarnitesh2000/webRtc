const express = require('express');
const app = express();
//for io to interact with it .
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uuid = require('uuid');



//setting the template engine
app.set("view engine","ejs");
app.use(express.static('public'));
app.get('/',(req,res)=>{

res.redirect(`/${uuid.v4()}`)
})

app.get('/:room',(req,res)=>{

res.render('room',{roomId: req.params.room});
    
})


io.on('connection', socket => {

    socket.on('join-room', (roomId,userId) =>{
        console.log(`${roomId} ${userId}`)
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected',userId);
    })

})


server.listen(5003);
