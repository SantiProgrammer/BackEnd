exports.inicio = async (req, res, next) => {
    try {
        res.render('inicio')
    } catch (e) {
        next(e);
    }
}

