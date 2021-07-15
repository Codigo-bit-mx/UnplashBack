const express = require('express');
const cors = require('cors');
const { dbconexion } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        //path
        this.imgRoutePath = '/api/uploads';
        this.imgCaraPath = '/api/url';

        //Conexion a BD
        this.conexionBD();
        //middleware
        this.middleware();
        //rutas
        this.routes();
    }

    async conexionBD() {
        await dbconexion();
    }

    middleware(){
        this.app.use( cors () );
        this.app.use( express.json() );
        this.app.use(express.static('public'));
        this.app.use(express.static('uploads'));
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }   

    routes(){
        this.app.use(this.imgRoutePath, require('../routes/imgRoute'));
        this.app.use(this.imgCaraPath, require('../routes/caraRoute'));
    }

    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT);
        })
    }
}

module.exports = Server; 