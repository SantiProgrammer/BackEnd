import { Router } from 'express';
import passport from 'passport';
import {
    getLoginController,
    getSignupController,
    postLoginController,
    postSignupController,
    getFailloginController,
    getFailsignup,
    getLogoutController,
    failRouteController
} from '../controllers/authController.js'


const router = new Router()


router.get('/login', getLoginController)
router.get('/faillogin', getFailloginController)
router.get('/signup', getSignupController)
router.get('/failsignup', getFailsignup)
router.get('/logout', getLogoutController)
router.post('/login', passport.authenticate("login", { failureRedirect: "/api/auth/faillogin" }), postLoginController)
router.post('/signup', passport.authenticate("signup", { failureRedirect: "/api/auth/failsignup" }), postSignupController)
router.get('*', failRouteController)



export { router as authRouter };

