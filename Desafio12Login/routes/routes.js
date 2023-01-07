const router = require("express").Router();
const controller = require("../controller/controller");


router.get("/", controller.inicio);




module.exports = router;
