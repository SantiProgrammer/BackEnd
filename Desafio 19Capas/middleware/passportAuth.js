import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import logger from "../utils/winston.js";
import Usuarios from "../models/usuarios.js";


const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

export const passportInit = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        Usuarios.findById(id, done);
    });
    passport.use(
        "login",
        new LocalStrategy((username, password, done) => {
            Usuarios.findOne({ username }, (err, user) => {
                if (err) return done(err);

                if (!user) {
                    logger.log('warn', `⚠️ User Not Found with username ${username}`)
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) {
                    logger.log('warn', `⚠️ Invalid Password`)
                    return done(null, false);
                }
                // no corto por error, ni corto por sin user, paso! ...
                return done(null, user);
            });
        })
    );
    passport.use(
        "signup",
        new LocalStrategy(
            {
                passReqToCallback: true,
            },
            (req, username, password, done) => {
                Usuarios.findOne({ username: username }, async function (err, user) {
                    if (err) {

                        res.render('usuario-registrado');
                        logger.log('warn', "❌ Error in SignUp: " + err);
                        return done(err);
                    }

                    if (user) {
                        logger.log('warn', "⚠️ User already exists");
                        return done(null, false);
                    }

                    const newUser = {
                        username: username,
                        password: createHash(password),
                        nombre: req.body.nombre,
                        direccion: req.body.direccion,
                        edad: req.body.edad,
                        telefono: req.body.telefono,
                        url: req.body.url,
                    };

                    Usuarios.create(newUser, (err, userWithId) => {
                        if (err) {
                            logger.log('warn', "❌ Error in saving user: " + err);
                            return done(err);
                        }
                        logger.log('warn', "✅ User registration succesful");
                        return done(null, userWithId);



                    });
                });
            }
        )
    );

};

export const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}


