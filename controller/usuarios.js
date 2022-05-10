const {request, response} = require('express')

const getUsers = (req = request, res = response) => {
    res.send('Obtener Usuarios')
}

const createUser = (req = request, res = response) => {
    res.send('Crear Usuarios')
}

const updateUser = (req = request, res = response) => {
    res.send('Actualizar Usuarios')
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