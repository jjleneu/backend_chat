const jwt = require("jsonwebtoken");

const generarJwt = (uid) =>{   
   return new Promise((resolve,reject)=>{
        const payload = { uid };
        jwt.sign(
        payload,
        process.env.JWT_KEY,
        {
            expiresIn: "24h",
        },
        (err, token) => {
            if (err) {
                reject('problema al generar el jwt');
            } else {
                resolve(token)
            }
        }
        );
   });
}   

module.exports = {
  generarJwt,
};