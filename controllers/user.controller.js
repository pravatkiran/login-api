const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
// const db = require('../util/database');
// sequelize = db.sequelize;
// Sequelize = db.Sequelize;
// const User = db.user;
let loginSequelize = require('../util/database');
let demoSequelize = require('../util/database');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}))

exports.postUser = (req, res) => {
    try {
        // let db = req.params.database;
        let dbSequelize = null;
        if (req.params.database == 'login') {
            console.log('params', req.params.database);
            dbSequelize = loginSequelize.login;
            console.log('loginSequelize', dbSequelize)
        } else if (req.params.database == 'demo') {
            console.log('params', req.params.database);
            dbSequelize = demoSequelize.demo;
            console.log('demoSequelize', dbSequelize);
        }
        bcrypt.genSalt(10, (err, salt) => {
            console.log('salt', salt);
            console.log('error', err);
            if (err) throw err;
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                if (err) throw err;
                var rawData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    role: req.body.role
                };
                let queryData = '"'.replace(/"/g, "'") + JSON.stringify(rawData) + '"'.replace(/"/g, "'");
                console.log('queryData', queryData);
                let newUser = await dbSequelize.query('CALL Create_User (' + queryData + ');');
                console.log('new user ', newUser);
                // await transporter.sendMail({
                //     to: rawData.email,
                //     from: 'demo@email.com',
                //     subject: 'Signup succeeded',
                //     html: '<h1>You successfully signed up!!</h1>'
                // })
                console.log('newUser', newUser);
                res.send(newUser);
            })
        })
    } catch (err) {
        console.log('Error', err);
    }
}

exports.getUser = async (req, res) => {
    try {
        let db = req.params.database;
        let dbSequelize = null;
        if (db == 'login') {
            dbSequelize = loginSequelize.login;
        } else if (db == 'demo') {
            dbSequelize = demoSequelize.demo;
        }
        let users = await dbSequelize.query('CALL Get_Users();');
        if (!users.length > 0)
            return res.status(500).json({ status: 'fail', msg: 'Error while fetching users' });
        return res.status(200).json({ status: 'ok', users: users });
    } catch (err) {
        console.log('Error', err);
    }
};


exports.getUserById = async (req, res) => {
    try {
        let db = req.params.database;
        let dbSequelize = null;
        if (db == 'login') {
            dbSequelize = loginSequelize.login;
        } else if (db == 'demo') {
            dbSequelize = demoSequelize.demo;
        }
        console.log('req.params.id', req.params.id);
        let user = await dbSequelize.query('CALL GetUserById (' + req.params.id + ' );');
        console.log('user', user);
        if (!user.length > 0)
            return res.status(500).json({ status: 'fail', msg: 'User not found.' });
        return res.status(200).json({ status: 'ok', user: user });
    } catch (err) {
        console.log('Error', err);
    }
}

exports.updateUser = async (req, res) => {
    try {
        let db = req.params.database;
        let dbSequelize = null;
        if (db == 'login') {
            dbSequelize = loginSequelize.login;
        } else if (db == 'demo') {
            dbSequelize = demoSequelize.demo;
        }
        let user = await dbSequelize.query('CALL GetUserById (' + req.params.id + ');');
        console.log('user', user[0].email);
        console.log('req.body', req.body);
        if (user[0].email)
            if (user.length > 0) {
                let queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
                let updatedUser = await sequelize.query('CALL UpdateUser (' + req.params.id + ', ' + queryData + ');');
                if (updatedUser[0].flag === 1)
                    return res.status(200).json({ status: 'ok', msg: 'User updated successfully.' });
                return res.status(406).json({ status: 'fail', msg: 'Error while updating user' });
            } else {
                return res.status(404).json({ status: 'fail', msg: 'User not found' });
            }
    } catch (err) {
        console.log('Error', err);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let db = req.params.database;
        let dbSequelize = null;
        if (db == 'login') {
            dbSequelize = loginSequelize.login;
        } else if (db == 'demo') {
            dbSequelize = demoSequelize.demo;
        }
        let user = await dbSequelize.query('CALL GetUserById (' + req.params.id + ' );');
        if (user.length > 0) {
            let deleteUser = await sequelize.query('CALL DeleteUser (' + req.params.id + ');');
            console.log('deleteUser', deleteUser);
            if (deleteUser[0].flag === 1)
                return res.status(200).json({ status: 'ok', msg: 'User deleted successfully.' });
            return res.status(406).json({ status: 'fail', msg: 'Error while deleting user.' })
        } else {
            return res.status(500).json({ status: 'fail', msg: 'User not found.' });
        }

    } catch (err) {
        console.log('Error', err);
    }
}

exports.getEmailList = async (req, res) => {
    try {
        let db = req.params.database;
        let dbSequelize = null;
        if (db == 'login') {
            dbSequelize = loginSequelize.login;
        } else if (db == 'demo') {
            dbSequelize = demoSequelize.demo;
        }
        let emails = await dbSequelize.query('CALL getEmailLists ();');
        if (emails.length > 0) {
            return res.status(200).json({ status: 'ok', data: emails })
        }
        return res.status(500).json({ status: 'fail', msg: 'Fail to fetch emails.' });
    } catch (err) {
        console.log('Error', err);
    }
}

