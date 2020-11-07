const Usuarios = require('../model/usuario.model');
var bcrypt = require('bcryptjs');
exports.login = (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.password;

        Usuarios.findOne({ email: email }).exec((err, resp) => {
            if (err) {
                return res.status(401).json({

                    ok: false,
                    msn: err

                });
            }
            if (!resp) {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'El usuario con el coreo: ' + email + ' no existe',
                    errors: { mensage: 'No existe un usuario con ese Correo' }
                });
            }
            if (!bcrypt.compareSync(password, resp.password)) {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'Contraseña invalida',
                    errors: { mensage: 'Contraseña invalida' }
                });
            }
            return res.status(200).json({
                ok: true,
                usuario: resp,
                id: resp._id
            });

        });
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }
}