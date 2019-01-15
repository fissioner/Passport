const router = require('express').Router();

const isAuthorized = (req, res, next) => {
    if (!req.user) res.redirect('/auth/login')
    else next();
};

router.get('/', isAuthorized, (req, res) => {
    res.send(`<img src='${req.user.thumbnail?req.user.thumbnail:''}'/>
    \n<h1>Welcome ${req.user.username}</h1>\n\n
    <a href='http://localhost:3000/auth/logout'>Logout</a>`);
});

module.exports = router;