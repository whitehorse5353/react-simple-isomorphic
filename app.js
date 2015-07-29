var React = require('react');
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
require('node-jsx').install();

app.engine('hbs', handlebars({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

browserify({debug: true})
    .transform(babelify)
    .require("./client/main.js", {entry: true})
    .bundle()
    .on("error", function (err) {
        console.log("Error : " + err.message);
    })
    .pipe(fs.createWriteStream("./build/bundle.js"));

app.get('/', function (req, res) {
    var BaseComponent = require('./public/baseComponent').View,
        componentString = React.renderToString(React.createElement(BaseComponent));
    res.render('component', {tplStr: componentString});
    app.use(express.static(__dirname + '/build'));
});
app.listen(3000);
console.log('server listening to port 3000');
