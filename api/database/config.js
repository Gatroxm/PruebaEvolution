var mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Base de Datos Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos');
    }
    
}

module.exports = {
    dbConection
}