const jwt = require("jsonwebtoken");

const validarJWT = (request, response, next) => {
  const { authorization } = request.headers;
  let token = authorization.replace("Bearer ", "");
  console.log(token);

  try {
    const {uid} =jwt.verify(token, process.env.JWT_KEY);
    request.uid= uid;
    next();
  } catch (error) {
    response.status(401).json(
        {ok:false,
        msg:'token invalio'
     }
    )
  }
  next();
};

module.exports = {
  validarJWT,
};
