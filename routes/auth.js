const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const authControllers = require('../controllers/authControllers');
router.route('/signup').post(authControllers.signup);
