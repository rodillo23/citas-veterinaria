const jwt = require('jsonwebtoken')

const generarJwt = (id, nombre)=>{
    
    return new Promise((resolve, reject) => {
        const payload = {
            id,
            nombre
        }
    
        jwt.sign(
            payload, 
            process.env.PRIVATE_KEY, 
            {expiresIn: '1h'},
            (err, token) => {
                if(err){
                    console.log(err);
                    reject('No se pudo generar el Token')
                }
                resolve(token)
            }
        )

    })

    
}

module.exports = generarJwt