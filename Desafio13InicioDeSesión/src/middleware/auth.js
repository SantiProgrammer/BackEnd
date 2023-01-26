/* Autentificacion */
const auth = (req, res, next) => {
    if (req.session?.user === "pepe" && req.session?.admin) {
        return next();
    } else {
        return res.status(401).send("error de autorización!");
    }
}

module.exports = { auth }

