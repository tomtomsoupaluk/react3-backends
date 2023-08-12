const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken')

const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Sever Error");
  };

router.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
router.get('/user', (req, res, next) => {
    try {
        const AuthorizationHeader = req.headers.authorization
        const token = AuthorizationHeader.split(' ')[1];
        const verifyToken = jwt.verify(token, 'dakshdhfhif88883092839849sdhfjh44423fvdsvdsv')


        const sql = 'SELECT id, username, age, email, address, contact FROM user WHERE id= ?';

        const params = [verifyToken.id]

        db.query(sql, params, (err, result) => {
            if (err) next(err);
            const data = {
                success: true,
                message: 'Get user data success',
                data: result[0]
            }
            res.send(data);
        });

    } catch (err) {
        next(err);
    }
});


router.get('/user', (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const verifyToken = jwt.verify(token, 'sadfopjnklgdsgsd4343nl34nkl54352njknkfd');

        const sql = 'SELECT id, username, age, email, address, contact FROM user WHERE id = ?';
        const params = [verifyToken.id]

        db.query(sql, params, (err, result) => {
            if (err) next(err);

            const data = {
                success: true,
                message: 'Get user success',
                data: result[0]
            }

            res.send(data);
        });
    } catch (err) {
        next(err);
    }
});

router.post('/user', (req, res, next) => {
    const { username, password, age } = req.body;

    const sql = 'INSERT INTO user(username, password, age) VALUES(?, ?, ?)';
    const params = [username, password, age];

    db.query(sql, params, (err, result) => {
        if (err) next(err);
        res.send("Insert success!");
    });
});

// router.put('/user', (req, res) => {
//     const { username, password, age, id } = req.body;

//     const sql = 'UPDATE user SET username = ?, password = ?, age = ? WHERE id = ?';
//     const params = [username, password, age, id];

//     db.query(sql, params, (err, result) => {
//         if (err) throw err;
//         res.send("Update success!");
//     });
// });

router.put('/user', (req, res, next) => {
    const { username, age, email, address, contact } = req.body;

    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const verifyToken = jwt.verify(token, 'dakshdhfhif88883092839849sdhfjh44423fvdsvdsv');

    const sql = 'UPDATE user SET username = ?, age = ?, email = ?, address = ?, contact = ? WHERE id = ?';

    const params = [username, age, email, address, contact, verifyToken.id];

    db.query(sql, params, (err, result) => {
        if (err) next(err);
        const getUserSql = 'SELECT id, username, age, email, address, contact FROM user WHERE id = ?';
        const getUserParams = [verifyToken.id];

        db.query(getUserSql, getUserParams, (err, result) => {
            if (err) next(err);

            const data = {
                success: true,
                message: 'Update user success',
                data: result[0]
            }

            res.send(data);
        });
    });
});

router.delete('/user/:id', (req, res, next) => {
    const { id } = req.params;

    const sql = 'DELETE FROM user WHERE id = ?';
    const params = [id];

    db.query(sql, params, (err, result) => {
        if (err) next(err);
        res.send("Delete success!");
    });
});

router.use(errorHandler);

module.exports = router;