import { Server } from 'socket.io'
import { Message} from '../models/message.model.js'

export const intialiseSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    const userSockets = new Map(); // {userId: socketId}
    const userActivities = new Map(); //{userId: activity}

    io.on("connection", (socket) => {
        console.log("New client connected", socket.id);

        // Listen for user_connected
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            // broadcaste to all connected sockets that this user is logged in
            io.emit("user_connected", userId);
            
            socket.emit("users_online", Array.from(userSockets.keys()));

            io.emit("activies", Array.from(userActivities.entries()));
        })

        socket.on("update_activity", ({ userId, activity }) => {
			console.log("activity updated", userId, activity);
			userActivities.set(userId, activity);
			io.emit("activity_updated", { userId, activity });
		});

        // Listen for msg
        socket.on("send_message", async (data) => {
            try {
                const{senderId, receiverId, content} = data;

                // Save to DB
                const message = await Message.create({senderId, receiverId, content});

                // send to receiver in real time if users_online
                const receiverSocketId = userSockets.get(receiverId);
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receive_message", message);
                }
                socket.emit("message_sent", message);
            } catch (error) {
                console.error("Error sending message", error);
                socket.emit("message_error", error.message);
                
            }

        }
        )

        // Listen for user_disconnected
        socket.on("user_disconnected", (userId) =>{
            let disconnectedUserId;

            for(const [userId, socketId] of userSockets.entries()){
                if(socketId === socket.id){
                    disconnectedUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId)
                    break;
                }
            }
            if (disconnectedUserId) {
                io.emit("user_disconnected", disconnectedUserId);
            } 
        })
    })
}