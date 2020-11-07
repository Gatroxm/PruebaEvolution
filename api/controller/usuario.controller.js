const Usuarios = require('../model/usuario.model');
var bcrypt = require('bcryptjs');

exports.get = (req, res) => {
    try {
        Usuarios.find({}).exec((err, Usuarios) => {
            if (err) {
                return res.status(401).json({

                    ok: false,
                    msn: err

                });
            }

            return res.status(200).json({

                ok: true,
                msn: 'Listado de Usuarios',
                usuarios: Usuarios
            });
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }
};

exports.getId = (req, res) => {

    try {
        const id = req.params.id;

        Usuarios.findById({ _id: id }).exec((err, usuario) => {
            if (err) {
                return res.status(401).json({

                    ok: false,
                    msn: err

                });
            }
            if (!usuario) {
                return res.status(401).json({
                    ok: false,
                    msn: `El usuario con el id: ${id}, No se encuentra dentro de nuestros registros`
                });
            }
            return res.status(201).json({
                ok: true,
                usuario: usuario
            });
        });
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }

}

exports.create = (req, res) => {

    try {
        const usuario = new Usuarios({
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        });

        usuario.save((err, usuarioCrated) => {
            if (err) {
                return res.status(401).json({

                    ok: false,
                    msn: err

                });
            }
            return res.status(201).json({

                ok: true,
                msn: `Usuario ${usuarioCrated.nombre}, Creado con éxito`,
                usuario: usuarioCrated,
                id: usuarioCrated._id

            });
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }

};

exports.update = (req, res) => {
    try {
        const id = req.params.id;

        Usuarios.findById({ _id: id }).exec((err, usuario) => {
            if (err) {
                return res.status(401).json({

                    ok: false,
                    msn: err

                });
            }
            if (!usuario) {
                return res.status(401).json({
                    ok: false,
                    msn: `El usuario con el id: ${id}, No se encuentra dentro de nuestros registros`
                });
            }

            usuario.nombre = req.body.nombre;
            usuario.email = req.body.email;

            usuario.save((err, usuarioEdit) => {
                if (err) {
                    return res.status(401).json({

                        ok: false,
                        msn: err

                    });
                }

                return res.status(200).json({
                    ok: true,
                    msn: `el Usuario ${usuarioEdit.nombre}, se actualizo con éxito`,
                    usuario: usuarioEdit
                });
            });
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }
}

exports.delete = (req, res) => {
    try {
        const id = req.params.id;

        Usuarios.findByIdAndRemove({ _id: id }).exec((err, usuarioDelete) => {
            if (err) {
                return res.status(401).json({

                    ok: false,
                    msn: err

                });
            }
            if (!usuarioDelete) {
                return res.status(401).json({
                    ok: false,
                    msn: `El usuario con el id: ${id}, No se encuentra dentro de nuestros registros`
                });
            }
            return res.status(201).json({
                ok: true,
                msn: `el Usuario ${usuarioDelete.nombre}, se Eliminó con éxito`
            });
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }
}