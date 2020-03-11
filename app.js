const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const demoRoutes = require('./util/database');

const app = express();

// app.use(bodyParser.urlencoded({extended: false})) // x-www-form-urlencoded for form

app.use(bodyParser.json()) // for application/json

// expressjwt middleware for validating jwt token
// app.use(expressJwt({secret: 'supersecretkey'}).unless({path: ['/user/create', '/login']}))

// for cors error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(userRoutes);
app.use(authRoutes);

app.listen(3001, () => {
    console.log('localhost started at port 3001......');
});