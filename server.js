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
app.use(express.static(`${__dirname}/client/build`));

app.get("/", (req, res) => res.json({ message: "Server Works" }));
app.use("/api", AppRouter);

app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

const server = http.createServer(app);
const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  //   origin: "https://battleship-chaos.herokuapp.com",
  //   methods: ["GET", "POST"]
  // }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("update_button", (data) => {
    socket.broadcast.emit("receive_button_update", data);
  });

  socket.on("host_change", (data) => {
    socket.broadcast.emit("change_host", data);
  });

  socket.on("send_counter", (data) => {
    socket.broadcast.emit("receive_counter", data);
  });

  socket.on("create_game", (data) => {
    socket.join(data);
  });

  socket.on("join_game", (data) => {
    console.log("user joined game: ", data);
    socket.join(data.room);
    let announcement = {
      user: "Info",
      message: `${data.user.name} has joined the game`
    };
    socket.to(data.room).emit("chat_recieve", announcement);
    socket.to(data.room).emit("player_joined", data.user);
  });

  socket.on("chat_send", (data) => {
    io.sockets.in(data.room).emit("chat_recieve", data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("planet_click", (data) => {
    socket.broadcast.emit("planet_update", data);
  });

  socket.on("send_game_state", (data) => {
    socket.broadcast.emit("recieve_game_state", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`));
