const {request, response} = require('express')
const bcrypt = require('bcrypt')

const Usuario = require('../model/usuario')
const generarJwt = require('../helpers/generar-jwt')

const login = async (req=request, res=response) => {
    const {email, password} = req.body
    let usuario
    try {
        usuario = await Usuario.findOne({email})
        
        //validar que el email exista
        if(!usuario){
            return res.status(400).json({
                msg: "Email o contraseña incorrectos -> Email no existe"
            })
        }
    
        //validar que el usuario este activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Email o contraseña incorrectos -> Status false"
            })
        }
    
        //validar contraseña
        const validPass = bcrypt.compareSync(password, usuario.password)
        if(!validPass){
            return res.status(400).json({
                msg: "Email o contraseña incorrectos -> Password incorrecto"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }

    //generar jwt
    const token = await generarJwt(usuario.id, usuario.nombre)


    res.status(200).json({
        usuario,
        token
    })
}

module.exports = {
    login
}