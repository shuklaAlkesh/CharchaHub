import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js"
import setUpSocket from './socket.js';
import messagesRoutes from './routes/MessagesRoutes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL =  process.env.DATABASE_URL;
const client = process.env.ORIGIN;


app.use(cors({
    origin: client,
    // origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

// to remove the error in deployment
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", client);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// app.use(cors({ origin: true }));
// app.use((req, res, next) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     next();
// });

app.get('/', (req, res) => {
    res.send('Hello from the server!');
})

app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/contacts",contactRoutes);
app.use("/api/messages",messagesRoutes);


const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

// socketio setup
setUpSocket(server);

// mongodb setup
mongoose.connect(databaseURL).then(()=>
    console.log("Connected to database"))
.catch(err =>console.log(err.message));

