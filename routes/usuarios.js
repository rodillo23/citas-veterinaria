const {Router} = require('express')
const { check } = require('express-validator')
const { getUsers, createUser, updateUser, deleteUser } = require('../controller/usuarios')
const router = Router()

router.get('/', getUsers)
router.post('/', [
    check('email', 'El correo no es valido').isEmail()
],createUser)
router.put('/:id', updateUser)
router.delete('/', deleteUser)

module.exports = router