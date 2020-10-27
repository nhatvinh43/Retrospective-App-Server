const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/UserController')
const { getAll, addBoard, deleteBoard } = require('../controllers/BoardController');
const {UserValidator, requiresLogout, requiresLogin} = require('../validators/validator')

//Users
router.post('/register', UserValidator, register)
router.post('/login', requiresLogout, login)
router.post('/logout', requiresLogin, logout)

//Board
router.get('/boards', getAll);
router.post('/boards/add', addBoard);
router.delete('/boards/delete', deleteBoard);

module.exports = router;