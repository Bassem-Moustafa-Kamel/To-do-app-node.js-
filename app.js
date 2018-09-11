var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();
//Here we required the express module and fired the function to be able to use express

//set up template engine
app.set('view engine', 'ejs');

//Now the aproject knows we will be using template engines

//Static files for every route that we put in the url
app.use(express.static('./public'));

//Fire controllers
todoController(app);


//Listen to a port
app.listen(3000);
console.log('You are listening to a port 3000');
