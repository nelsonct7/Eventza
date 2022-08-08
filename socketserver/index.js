const io=require('socket.io')(8900,{
    cors:{
        origin:'http://localhost:3000'
    }
})
 
let users=[{userId:"",socketId:""}]

const addUser=(userId,socketId)=>{
    !users.some(user=>user.userId===userId) && 
    users.push({userId,socketId})
}

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId!==socketId)
}

const getUser=(userId)=>{
    const user = users.find(user=>user.userId===userId)
    return user
} 

io.on("connection",(socket)=>{
    //connected
    console.log('A user connected');
    socket.on("addUser",userId=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users)
    })

    //send and recieve message
    socket.on("sendMessage",({senderId,recieverId,text,senderName,senderType})=>{
        const user=getUser(recieverId);
        user && 
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text,
            senderName,
            senderType
        })
    })


    //disconnected
    socket.on("disconnect",()=>{
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})