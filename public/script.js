const socket = io('/');
const myPeer = new Peer(undefined,{

    host: '/',
    port: 3001

});
socket.emit('join-room',RoomId,10);


socket.on('user-connected' ,(userId)=>{
    console.log(`user connected ${userId}`);
})

