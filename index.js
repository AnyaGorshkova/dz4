'use strict'

let fs = require('fs');
let path = require('path');
let express = require('express');
let jade = require('jade');
let bodyParser = require('body-parser');
let config = require('./config.json');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String, body: String });


let app = express();

var jsonParser = bodyParser.json();

// шаблонизатор
app.set('view engine', 'jade');
app.set('views', path.resolve(`./${config.http.publicRoot}/markups/_pages`));

app.use(express.static(path.resolve(config.http.publicRoot)));

// routes
app.get('/', (req,res) =>{
	res.render('auth');
});

app.get('/portfolio.html', (req,res) =>{
	res.render('portfolio');
});

app.get('/about.html', (req,res) =>{
	res.render('about');
});

app.get('/blog.html', (req,res) =>{
	res.render('blog');
});

app.get('/', (req,res) =>{
	res.render('auth');
});
app.get('/admin', (req,res) =>{
	res.render('test');
});

app.post('/addPost', jsonParser, (req,res) =>{

	var kitty = new Cat(req.body);

	kitty.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    res.send(req.body);
		}
});
});

// обработка ошибок

// запуск сервера
app.listen(config.http.port, config.http.host, () =>{
	console.log(' ура!!!работает!!!');
});

