
exports.get = (req, res) => {
    return res.status(200).json({
        ok: true,
        mensaje: 'Aplicación de Tareas'
    })
}