const { request, response } = require("express")
const jwt = require('jsonwebtoken')
const Usuario = require("../model/usuario")

const validarJWT = async(req = request, res = response, next)=>{
    const token = req.header('token')

    if(!token){
        return res.status(401).json({
            msg: 'No se recibio token en la peticion'
        })
    }

    try {

        const {id, nombre} = jwt.verify(token, process.env.PRIVATE_KEY)
        
        const usuario = await Usuario.findById(id)
        
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido -> usuario no existe en BD'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no válido -> usuario con estado false"
            })
        }

        req.usuarioAuth = usuario
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = validarJWT