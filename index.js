
require('dotenv').config()
const express = require('express'),
app = express(),
path = require('path'),
authRoutes = require('./routes/auth-routes'),
port = 3000;

app.use('/', express.static(path.join(__dirname, './public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
