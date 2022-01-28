const express = require('express');
const router = express.Router();

const { getAll, create, login } = require("./controller");

router.get('/', getAll);
router.post('/', create);
router.post('/login', login);

module.exports = router;