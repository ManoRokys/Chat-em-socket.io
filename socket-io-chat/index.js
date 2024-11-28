// Importando o Express (CommonJS)
const express = require("express")
const app = express()

// Criando instancia do servidor http do Node.js
const http = require("http").createServer(app)

const io = require("socket.io")(http)

io.on("connection", (socket) => {
    socket.on("join", (data) => {
        console.log(`${data.nickname} entrou no chat`)
        io.emit("join", data)
    })

    socket.on("msg", (data) => {
        console.log(data)
        io.emit("showmsg", data)
    })
})



// Configurar EJS
app.set("view engine", "ejs")

// ROTA PRINCIPAL
app.get("/", (req, res) => {
    res.render("index")
})

const port = 3001
const host = "0.0.0.0"
http.listen(port, host, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`)
})
