import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js"
import setUpSocket from './socket.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL =  process.env.DATABASE_URL;
const client = process.env.ORIGIN;


app.use(cors({
    origin: client,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());

app.get("/", function(req, res){
    res.send("Hello World");
})

app.use("/api/auth",authRoutes);
app.use("/api/contacts",contactRoutes);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

// socketio setup
setUpSocket(server);

// mongodb setup
mongoose.connect(databaseURL).then(()=>
    console.log("Connected to database"))
.catch(err =>console.log(err.message));

// 1:09:21