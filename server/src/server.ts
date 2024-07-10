import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { createHotelRouter } from "./controllers/hotelController";
import { WeskiProvider } from "./providers/weskiProvider";



const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use(cors());
app.use(express.json())

const weskiHotelProvider = new WeskiProvider();
const hotelProviders = [weskiHotelProvider];
const hotelRouter = createHotelRouter(io,hotelProviders);
app.use('/hotel',hotelRouter);

io.on('connection', (socket) => {
    console.log('Client connected');
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});