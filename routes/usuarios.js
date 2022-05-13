const {Router} = require('express')
const { check } = require('express-validator')
const router = Router()

const { getUsers, createUser, updateUser, deleteUser } = require('../controller/usuarios')
const Role = require('../model/role')


router.get('/', getUsers)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'El password debe tener mínimo 6 caracteres').isLength(6),
    check('role').custom( async role => {
        const esRolValido = await Role.findOne({role})
        if(!esRolValido){
            console.log(esRolValido);
            throw new Error(`${role} no es un role válido`)
        }
    })
],createUser)
router.put('/:id', updateUser)
router.delete('/', deleteUser)

module.exports = router