const {request, response} = require('express')
const bcrypt = require('bcrypt')

const Usuario = require('../model/usuario')

const login = async (req=request, res=response) => {
    const {email, password} = req.body

    try {
        const usuario = await Usuario.findOne({email})
        
        //validar que el email exista
        if(!usuario){
            res.status(400).json({
                msg: "Email o contraseña incorrectos -> Email no existe"
            })
        }
    
        //validar que el usuario este activo
        if(!usuario.estado){
            res.status(400).json({
                msg: "Email o contraseña incorrectos -> Email false"
            })
        }
    
        //validar contraseña
        const validPass = bcrypt.compareSync(password, usuario.password)
        if(!validPass){
            res.status(400).json({
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
    res.status(200).json({
        usuario
    })
}

module.exports = {
    login
}