const Usuario = require('../models/usuario');
const { generarJwt } = require("../helpers/jwt");

const crearUsuario = async(require, response) => {

  const {email} = require.body;

  const emailUser = await Usuario.findOne({email});
 // console.log(emailUser);
  if(emailUser){
    return response.status(400).json({
      ok: false,
      msg:'Correo ya existe.'
    });
  }


  const usuario = new Usuario(require.body);
  await usuario.save();

  const token = await generarJwt(usuario.uid);

  response.json({
    ok: true,
    usuario,
    token,
  });
};

const login = async(require,response)=>{
  const { authorization } = require.headers;

  const decodeAuth = Buffer.from(authorization.replace('Basic ',''), "base64").toString("utf8");  
  const index = decodeAuth.indexOf(":");
  const email = decodeAuth.substring(0,index);
  const password = decodeAuth.replace(`${email}:`, "");
  
  let usuario = await Usuario.findOne({ email, password });

  if(!usuario){
   return response.status(500).json({
      ok:false,
      msg:'Usuario no existe'
    });
  }

  const token = await generarJwt(usuario.uid);

   response.status(200).json({
     ok: true,
     msg: "ok",
     token
   });


}

const refreshToken =(request,response)=>{
  response.status(200).json({
    ok:true,
    msg:'ok'
    
  })
}
module.exports = { login, crearUsuario, refreshToken };