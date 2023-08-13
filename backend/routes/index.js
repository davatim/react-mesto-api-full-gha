const router = require('express').Router();

const userRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');

const validation = require('../middlewares/validation');

router.post('/signin', validation.login, login);
router.post('/signup', validation.createUser, createUser);
router.get('/logout', auth, logout);
router.use('/cards', auth, cardsRouter);
router.use('/users', auth, userRouter);

module.exports = router;
