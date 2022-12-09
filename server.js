const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

const http = require("http");
const { Server } = require("socket.io");

const AppRouter = require("./routes/AppRouter");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "Server Works" }));
app.use("/api", AppRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`));
