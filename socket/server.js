const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected.`);

  socket.on("message", (message, roomName, imageURL) => {
    console.log(message, roomName,imageURL);

    if (roomName) {
      io.to(roomName).emit("message",roomName, message, imageURL); // Sadece belirli odaya mesajı gönder
    } else {
      io.emit("message", message); // Tüm bağlantılara mesajı gönder
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected`);
  });

  socket.on("joinRoom", (roomName) => {
    console.log("Joining room: " + roomName);

    // Belirli oda adına katıl
    socket.join(roomName);
    console.log(`Joined room: ${roomName}`);
  });

  socket.on("sendCoordinates", (coordinates) => {
    io.emit("coordinates: ", coordinates);
    console.log("Socket Coordinate: ",coordinates)
  });


});

console.log("Server is running on port 3000");
