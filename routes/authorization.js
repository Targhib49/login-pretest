const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token,SECRET_KEY, (error, data) => {
        if(error) return res.status(403).send('error');
        req.user = data;
        next();
    })
}