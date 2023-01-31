const getNginx = (req, res) => res.render('nginx', { layout: 'index' })
const getApiRandoms = (req, res) => res.render('ApiRandoms');


module.exports = {
    getNginx,
    getApiRandoms
}