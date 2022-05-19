const {request, response} = require('express')
const bcrypt = require('bcrypt')
const Usuario = require('../model/usuario')
const { validationResult } = require('express-validator')

const getUsers = (req = request, res = response) => {
    res.status(200).json({
        msg: 'Lista de Usuarios'
    })
}

const createUser = async(req = request, res = response) => {
    
    const {nombre, email, password, role} = req.body
    const usuarioNuevo = new Usuario({
        nombre,
        email,
        password,
        role,
        fecha_alta: new Date().toLocaleString()
    })
   
    //encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuarioNuevo.password = bcrypt.hashSync(password, salt)

    //guardar usuario
    try {
        await usuarioNuevo.save()
        res.status(201).json({
            msg: 'Usuario creado exitosamente',
            usuarioNuevo
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

const updateUser = async(req = request, res = response) => {
    const {id} = req.params
    const {password, estado, email, ...data} = req.body

    const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})

    res.status(200).json({
        msg: 'Usuario Actualizado con éxito.',
        usuario
    })
}

const deleteUser = (req = request, res = response) => {
    res.send('Eliminar Usuarios')
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}