const router = require('express').Router(),
    passport = require('passport'),
    path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/local', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signin.html'));
})

router.post('/local/callback',
    passport.authenticate('local', {
        failureRedirect: '/auth/flash',
        failureFlash: 'username and password invalid'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

router.post('/register-user',
    passport.authenticate('registerUser', {
        successRedirect: '/profile',
        failureRedirect: '/auth/flash',
        failureFlash: 'username taken'
    }));

router.get('/flash', (req, res) => {
    res.send(req.flash());
});
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
})

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

router.get('/instagram',
    passport.authenticate('instagram'));

router.get('/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

router.get('/twitter',
    passport.authenticate('twitter'));

router.get('/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

router.get('/linkedin',
    passport.authenticate('linkedin'));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/profile');
    });

module.exports = router;