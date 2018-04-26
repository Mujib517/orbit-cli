var router = require('express').Router();
var defaultCtrl = require("../controllers/default.ctrl");

router.get('/', defaultCtrl.home);
router.get('/about', defaultCtrl.about);
router.get('/contact', defaultCtrl.contact);

module.exports = router;