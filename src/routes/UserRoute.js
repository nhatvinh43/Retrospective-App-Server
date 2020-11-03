const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/UserController')
const { getAll, getOne, addBoard, deleteBoard, updateBoard } = require('../controllers/BoardController');
const { UserValidator, requiresLogout, requiresLogin } = require('../validators/validator')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const Board = require('../models/Board');

