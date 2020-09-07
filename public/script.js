const socket = io('/');
const vid = document.getElementById('video-grid');
const myPeer = new Peer(undefined,{

    host: '/',
    port: 3001

});
const peers = {}

const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video:true,
    audio: true
}).then(stream =>{

addVideoStream(myVideo, stream);

myPeer.on('call', call =>{
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream =>{
        addVideoStream(video,userVideoStream)
    })
})



socket.on('user-connected', userId =>{
    connectedToNewUser(userId, stream)
})

})
/*
socket.on('user-disconnected', () =>{
    console.log(userId);
    if(peers[userId]) peers[userId].close()
})
*/
myPeer.on('open', id =>{
    socket.emit('join-room',RoomId,id);
})


//on this event of user-connected pass the userId 
socket.on('user-connected' ,(userId)=>{
    console.log(`user connected ${userId}`);
})

function connectedToNewUser(userId,stream){
const call = myPeer.call(userId,stream)
call.on(stream,userVideoStream =>{
    const video = document.createElement('video');
    addVideoStream(video, userVideoStream);
})

call.on('close', () =>{
    video.remove();
})
    peers[userId] = call ;
}


function addVideoStream(video,stream){

    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () =>{
        video.play()
    })
    vid.append(video);
}

