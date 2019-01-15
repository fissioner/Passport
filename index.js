
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
port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, () => {
    console.log('DB connected')
});

app.use('/', express.static(path.join(__dirname, './public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
