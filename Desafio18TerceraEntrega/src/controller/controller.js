const inicio = async (req, res, next) => {
    try {
        res.render('inicio')
    } catch (e) {
        wLogger.log('ruta inicio error', `${e}`)
    }
}

export default inicio
