const mongoose = require("mongoose");

const bdConnect = async()=>{
    try {
        await mongoose.connect(process.env.DB_STRING);
         console.log('conexion exitosa');
    } catch (error) {
        console.log('error',error)
        throw Error(error);
    }
}


module.exports = {
  bdConnect,
};