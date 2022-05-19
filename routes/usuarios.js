const {Router} = require('express')
const { check } = require('express-validator')
const router = Router()

const { getUsers, createUser, updateUser, deleteUser } = require('../controller/usuarios')
const { validarRole, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')


router.get('/', getUsers)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existeEmail),
    check('password', 'El password debe tener mínimo 6 caracteres').isLength(6),
    check('role').custom(validarRole),
    validarCampos
],createUser)

router.put('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(validarRole),
    validarCampos
],updateUser)

router.delete('/', deleteUser)

module.exports = router