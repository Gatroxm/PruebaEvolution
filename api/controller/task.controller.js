const Tasks = require('../model/task.model');

exports.get = (req, res) => {
    try {
        var tareasPendientes = [];
        var tareasCompletadas = [];
        var idUsuario = req.params.idUsuario;
        Tasks.find({ usuario: idUsuario })
            .populate('usuarios')
            .exec((err, tasks) => {
                if (err) {
                    return res.status(401).json({
                        ok: false,
                        msn: err
                    });
                }
                if (tasks.length <= 0) {
                    return res.status(200).json({
                        ok: false,
                        msn: 'No tiene tareas creadas',
                        cantidad: 0
                    });
                }
                tasks.forEach(element => {
                    if( !element.completada) {
                        tareasPendientes.push(element);
                    } else {
                        tareasCompletadas.push(element)
                    }
                });
                return res.status(200).json({
                    ok: true,
                    tareasPendientes,
                    tareasCompletadas
                })
            });
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }
}
exports.getID = (req, res) => {

    try {
        var id = req.params.id;
        Tasks.findById({_id: id}).exec( (err, task) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    msn: err
                });
            }
            if (!task) {
                return res.status(401).json({
                    ok: false,
                    msn: `La tarea con el id ${id}, no se encuentra dentro de nuestros registros`
                });
            }
            return res.status(200).json({
                ok: true,
                task
            });
        })
        
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }

}

exports.edit = (req, res) => {
    try {
        var id = req.params.id;
        Tasks.findById({_id: id}).exec( (err, task) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    msn: err
                });
            }
            if (!task) {
                return res.status(401).json({
                    ok: false,
                    msn: `La tarea con el id ${id}, no se encuentra dentro de nuestros registros`
                });
            }
            task.nombre = req.body.nombre;
            task.prioridad = req.body.prioridad;
            task.fechaVncimiento = req.body.fechaVncimiento;
            task.completada = req.body.completada;

            task.save( (err, taskEdit) => {
                if (err) {
                    return res.status(401).json({
                        ok: false,
                        msn: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    msn: `La tarea ${taskEdit.nombre}, se actualizo con éxito`,
                    task: taskEdit
                });

            })
        })
        
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }
}

exports.create = (req, res ) => {

    try {
        
        const task = new Tasks({
            nombre: req.body.nombre,
            prioridad: req.body.prioridad,
            fechaVncimiento: req.body.fechaVncimiento,
            usuario: req.body.usuario,
        });
        task.save( (err, taskSaved) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    msn: err
                });
            }
            return res.status(201).json({
                ok: true,
                msn: `Tarea ${taskSaved.nombre}, Se creo con éxito`,
                task: taskSaved
            });
        })

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }

}

exports.delete = (req,res) => {
    try {
        var id = req.params.id;
        Tasks.findByIdAndRemove({_id: id}).exec( (err, taskDelete) => {

            if (err) {
                return res.status(401).json({
                    ok: false,
                    msn: err
                });
            }

            return res.status(201).json({

                ok:true,
                msn: `La Tarea ${taskDelete.nombre}, Fue eliminada de los registros`

            });

        });
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msn: e.message
        });
    }
}