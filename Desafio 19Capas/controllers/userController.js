export const getUserProfile = async (req, res) => {
    const { username, password, edad, telefono, direccion, url, nombre } = req.user;
    const user = { username, password, edad, telefono, direccion, url, nombre };
    const admin = JSON.stringify(req.session.admin);
    res.render("userProfile", { layout: 'logged', user, admin })
}





