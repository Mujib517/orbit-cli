var express = require('express');
var jade = require('pug');
var app = express();
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Server is running on port", port);
});

app.set('view engine', 'pug');
app.use(express.static("lib"));

var defaultRouter = require('./routes/default.router');
//routes
app.use('/', defaultRouter);