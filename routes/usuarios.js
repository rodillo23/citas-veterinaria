const {Router} = require('express')
const { check } = require('express-validator')
const router = Router()

const { getUsers, createUser, updateUser, deleteUser, updatePass } = require('../controller/usuarios')
const { validarRole, existeEmail, existeUsuarioPorId, eliminadoAnteriormente } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-JWT')


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

router.put('/changePass/:id', [
    check('id', 'No es in Id Válido').isMongoId(),
    check('id').custom(eliminadoAnteriormente),
    check('id').custom(existeUsuarioPorId),
    check('password', 'El password debe tener como minimo 6 caracteres.').isLength({min:6}),
    validarCampos
],updatePass)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un Id Válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    //check('id').custom(eliminadoAnteriormente),
    validarCampos
],deleteUser)

module.exports = router