const mongoose = require('mongoose');

const dbconexion = async () => {

    try {
        await mongoose.connect( process.env.CONEXION_IMG_BD, {
            useNewUrlParser:    true,
            useUnifiedTopology: true,
            useCreateIndex:     true,
            useFindAndModify:   false
        })
        console.log("base de datos CONECTADA");

    } catch (error) {
        console.log(error);
        throw new Error ('SUCCEDIO UN ERROR');
    }

}

module.exports = {
    dbconexion
}