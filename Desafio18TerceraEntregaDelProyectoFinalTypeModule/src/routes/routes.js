import wLogger from "../utils/winston.js"

function getRoot(req, res) {
  res.render("home", {});
}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { layout: 'logged', user });
  } else {
    res.render("login");
  }
}

function getSignup(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { layout: 'logged', user });
  } else {
    res.render("signup");
  }
}

function postLogin(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  req.session.admin = true;
  res.render('profileUser', { layout: 'logged', user })
}

function postSignup(req, res) {
  const { username, password, age } = req.user;
  const user = { username, password, age };
  res.render("profileUser", { layout: 'logged', user });
}

function getFaillogin(req, res) {
  res.render("login-error", {});
}

function getFailsignup(req, res) {
  res.render("signup-error", {});
}

function getLogout(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("logout", { user });
  req.logout();
}

function failRoute(req, res) {
  const clientRoute = req.params;
  wLogger.log('warn', `Route entered by the client: ${JSON.stringify(clientRoute)}`)
  res.status(404).render("routing-error", {});
}

export default {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  failRoute,
}
