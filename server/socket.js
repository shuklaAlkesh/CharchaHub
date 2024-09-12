import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import dotenv from "dotenv";
dotenv.config();

const client = process.env.ORIGIN;

const setUpSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: client,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);

        const messageData = await  Message.findById(createdMessage._id)
        .populate("sender","id email firstName lastName image color")
        .populate("recipient","id email firstName lastName image color");

        if(recipientSocketId){
            io.to(recipientSocketId).emit("receivedMessage", messageData);
        }

        if(senderSocketId){
            io.to(senderSocketId).emit("receivedMessage", messageData);
        }
    }
        
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket id ${socket.id}`);
        } else {
            console.log(`Unauthenticated or userId not provided during client connection: ${socket.id}`);
        }

        socket.on("sendMessage",sendMessage);
        socket.on("disconnect", disconnect);
    });
};

export default setUpSocket;

