const express = require('express');
const router = express.Router();

const { sendEmail, verify } = require("./controller");

router.post('/verify', verify);
router.put('/send/:id', sendEmail);

module.exports = router;


