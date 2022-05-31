const express = require('express')
const cors = require('cors')

const usuarios = require('../routes/usuarios')
const auth = require('../routes/auth')
const dbConnection = require('../database/config')

class Server{
    constructor(){
        this.app = express()

        this.conectarDB()

        this.middlewares()

        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api/usuarios', usuarios)
        this.app.use('/api/auth', auth)
    }

    listen(){
        this.app.listen(process.env.PORT, ()=> console.log("Escuchando en el puerto ", process.env.PORT))
    }
}

module.exports = Server