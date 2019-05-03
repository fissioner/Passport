
require('dotenv').config()
const express = require('express'),
    app = express(),
    path = require('path'),
    authRoutes = require('./routes/auth-routes'),
    profileRoutes = require('./routes/profile-routes')
    strategies = require('./passport/auth-strategies'),
    mongoose = require('mongoose'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'mySessions'
});

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, () => {
    console.log('DB connected')
});



app.get('/sesh', function (req, res) {
    res.send('Hello ' + JSON.stringify(req.session));
});

app.use('/', express.static(path.join(__dirname, './public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
