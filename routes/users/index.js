const express = require('express');
const router = express.Router();

const { getAll, create, login, refreshToken, addToken, logout } = require("./controller");

router.get('/', getAll);
router.post('/', create);
router.post('/login', login);
router.post('/token', refreshToken);
router.put('/addToken/:id', addToken);
router.put('/logout/:id', logout);

module.exports = router;