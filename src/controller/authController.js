const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');
const Admin = require('../model/admin');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
        return res.status(400).send({
            error: 'User not found, please try again'
        });
    }

    if(!await bcrypt.compare(password, admin.password)) {
        return res.status(400).send({
            error: 'Invalid password, please try again'
        });
    }

    admin.password = undefined;

    const token = jwt.sign(
        { id: admin.id },
        authConfig.secret,
        { expiresIn: 86400 }
    );

    res.send({ admin, token });
})

module.exports = (app) => app.use('/auth', router);