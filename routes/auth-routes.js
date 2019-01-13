const router = require('express').Router(),
path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/google', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/loggedin.html'));
});

router.get('/facebook', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/loggedin.html'));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/loggedout.html'));
});

module.exports = router;