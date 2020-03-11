const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const sequelize = require('../util/database');
// const db = require('../util/database');
// demoSequelize = db.demoSequelize;
// loginSequelize = db.loginSequelize;
// Sequelize = db.Sequelize;
// const User = db.user;
const demoSequelize = require('../util/database');
const loginSequelize = require('../util/database');


exports.login = async (req, res) => {
    try {
        let db = req.params.database;
        dbSequelize = null;
        if(db == 'login'){
            dbSequelize = loginSequelize.login;
        }else if(db == 'demo'){
            dbSequelize = demoSequelize.demo;
        }
        let Email = req.body.email;
        let Password = req.body.password;
        let loadedUser = await dbSequelize.query('CALL GetUserByEmail (' + JSON.stringify(Email)  + ');')
        if (loadedUser.length > 0) {
            bcrypt.compare(Password, loadedUser[0].password, (err, result) => {
                if (result == true) {
                    const token = jwt.sign({
                        email: loadedUser[0].email,
                        id: loadedUser[0].id
                    }, 'supersecretkey', { expiresIn: '1h' });
                    let tokenCreatedTime = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '');
                    return res.status(200).json({
                        status: 'ok', token: token, id: loadedUser[0].id, tokenCreatedTime: tokenCreatedTime,
                        firstName: loadedUser[0].firstName, lastName: loadedUser[0].lastName, role: loadedUser[0].role
                    });
                }
                else {
                    return res.status(401).json({ status: 'fail', msg: 'Password is incorrect' });
                }
            });
        } else {
            return res.status(401).json({ status: 'fail', msg: 'Email is not registered' });
        }
    } catch (err) {
        console.log('Error', err);
    }
}
