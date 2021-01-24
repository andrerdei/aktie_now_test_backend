const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).send({
            error: 'No token provided'
        })
    }

    const parts = authHeader.split(' ');
    const [ token ] = parts;

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'Invalid token'
            })
        }

        req.adminId = decoded.id;
    });

    next();
}