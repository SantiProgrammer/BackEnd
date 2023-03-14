import { sendEmail } from "../utils/nodeMailer.js";
import { sendSMS } from "../utils/twilio.js";
import logger from '../utils/winston.js';

export const getLoginController = async (req, res) => {
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render("LogInSuccess", { layout: 'logged', user });
    } else {
        res.render("login");
    }
}

export const getSignupController = async (req, res) => {
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render("LogInSuccess", { layout: 'logged', user });
    } else {
        res.render("signup");
    }
}

export const postLoginController = async (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    req.session.admin = true;
    res.render('LogInSuccess', { layout: 'logged', user })
}

export const postSignupController = async (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    sendEmail(user.username, " ");
    sendEmail("santi.iztli@gmail.com", user);
    sendSMS("User Registration succesful ✅", req.user.telefono);
    res.render("LogInSuccess", { layout: 'logged', user });
}

export const getLogoutController = async (req, res) => {
    try {
        const { username, password } = req.user;
        const user = { username, password };
        req.logout(() => {
            res.render("logout", { layout: "index", user });
        })
    } catch (e) {
        logger.log('warn', '⚠️ No session to logout:', `${e}`)
        res.render('login')
    }
}
export const getFailloginController = async (req, res) => {
    res.render("login-error", {});
}

export const getFailsignup = async (req, res) => {
    res.render("signup-error", {});
}

export const failRouteController = async (req, res) => {
    try {
        const clientRoute = req.params;
        logger.log('warn', `⚠️ Route entered by the client: ${JSON.stringify(clientRoute)}`)
        res.status(404).render("routing-error", {});

    } catch (e) {
        logger.log('error', `❌ Fail route controller: ${e}`);
    }
}