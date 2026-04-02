
const { signupValidation, loginupValidation} = require('../Validations/AuthValidation');
const {signup, login} = require('../Controllers/AuthController');
const router = require('express').Router();


router.post("/login",loginupValidation, login);

router.post("/signup",signupValidation, signup);
 


module.exports = router;