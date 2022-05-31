const Role = require('../model/role')
const Usuario = require('../model/usuario')

//validar si existe el role
const validarRole = async role => {
    const esRolValido = await Role.findOne({role})
    if(!esRolValido){
        console.log(esRolValido);
        throw new Error(`${role} no es un role válido`)
    }
}

 //validar si existe correo
const existeEmail = async (email)=>{
    const usuarioExiste = await  Usuario.findOne({email})
    if(usuarioExiste){
        throw new Error('El correo ya se encuentra registrado en la Base de Datos')
    }
}

const existeUsuarioPorId = async (id)=>{
    const usuario = await Usuario.findById(id)
    console.log(usuario);
    if(!usuario){
        throw new Error('El usuario no existe en la Base de Datos')
    }
}

const eliminadoAnteriormente = async(id)=> {
    const usuario = await Usuario.findById(id)
    if(usuario && !usuario.estado){
        throw new Error('El usuario ya fue eliminado anteriormente')
    }
}

module.exports = {
    validarRole, 
    existeEmail,
    existeUsuarioPorId,
    eliminadoAnteriormente
}