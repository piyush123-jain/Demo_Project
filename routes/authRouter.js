const { Router } = require('express');
const router = Router();
const authController = require('../controller/authContoller');


router.post('/signUpPannel',authController.signUp_post);
router.post('/checkEmail',authController.checkEmail);
router.post('/login',authController.login);
router.post('/verifyEmail',authController.verifyEmail);
// router.post('/setPassword',authController.setPassword);

module.exports = router;
