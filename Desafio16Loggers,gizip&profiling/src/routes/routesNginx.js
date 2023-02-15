const getNginx = (req, res) => res.render('nginx', { layout: 'nginx' })
const getApiRandoms = (req, res) => res.render('ApiRandoms', { layout: 'nginx' });


module.exports = {
    getNginx,
    getApiRandoms
}