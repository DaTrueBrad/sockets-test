const express = require ('express')
const app= express()
const { Server } = require ('socket.io')
const http = require("http")
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})


io.on("connection", socket => {
  console.log("Connected:", socket.id)

  socket.on("join", data => {
    console.log("Join: ", data)
    socket.join(data)
  })

  socket.on("send", data => {
    console.log("Send: ", data)
    io.to(data.room).emit("newMessage", data.message)
  })
})

server.listen(4000, () => console.log('------4000 is up------'))