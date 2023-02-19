const io=require('socket.io')(8900,{
    cors:{
        origin:'http://localhost:3000'
    }
})
 
let users=[]
let userPair=[{userId:"",socketId:""}]
const addUser=(userId,socketId)=>{

    let flag=0;
    for(let i=0;i<users.length;i++){
        if(users[i]===userId){
        flag=1
        }
    }
    if(flag===0){
        users.push(userId,socketId)
        userPair.push({userId,socketId})
        
    }
        flag=0
    
    //!users.some(user=>user.userId===userId) && users.push(userId,socketId)
}

const removeUser=(socketId)=>{
    const user3=userPair.find(use=>use.socketId===socketId)
    console.log(user3);
    userPair=userPair.filter(user2=>user2.socketId!==socketId)
    users=users.filter(us=>us!==user3?.socketId)
    users=users.filter(us=>us!==user3?.userId) 
}

const getUser=(userId)=>{
    const user = users.find(use=>use===userId)
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
        
        const user1=getUser(recieverId);
        console.log("Message recieved "+user1);
        const user=userPair.find(use=>use.userId===user1)
        console.log("Message recieved "+user);
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