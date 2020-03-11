const Sequelize = require('sequelize');

// const sequelize = new Sequelize('login', 'root', 'entero123', {
//     host: 'localhost',
//     dialect: 'mysql'
// });


// connection uri 'sql://user:password@domain:port/dbname' 


let demoUri = 'mysql://root:entero123@127.0.0.1:3306/demo';
let loginUri = 'mysql://root:entero123@127.0.0.1:3306/login';

let options = {
    logging: false,
    define: {
        timestamps: false
    },
    pool: {
        max: 20,
        min: 0
    }
}

const demoSequelize = new Sequelize(demoUri, options);
const loginSequelize = new Sequelize(loginUri, options);

// const db = {};
// db.Sequelize = Sequelize;
// db.demoSequelize = demoSequelize;
// db.loginSequelize = demoSequelize;


// // Models tables 
// db.user = require('../models/user.model')(demoSequelize, Sequelize);
// db.user = require('../models/user.model')(loginSequelize, Sequelize);
// db.userRole = require('../models/userRole.model')(sequelize, Sequelize);

module.exports = {
    demo : demoSequelize,
    login : loginSequelize
};