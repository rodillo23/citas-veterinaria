const {Router} = require('express')
const { check } = require('express-validator')
const { login } = require('../controller/auth')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.post('/login', [
    check('email', 'No es un email válido').isEmail(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
    validarCampos
],login)

module.exports = router