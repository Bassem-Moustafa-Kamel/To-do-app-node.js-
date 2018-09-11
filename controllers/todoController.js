//We need to add body-parser to access the data in the post request
var bodyParser = require('body-parser');

//Here we require mongoose module
var mongoose = require('mongoose');


//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/todo');
mongoose.connection.once('open', function () {

  console.log('Connection has been made, now make fireworks');
  //done function will tell mocha when the connection is established
}).on('error', function (error) {
  //It is an another EventListenner to listen out for errors
  console.log('Connection error', error);
});

//Create the schema
var todoSchema = new mongoose.Schema({
  item: String,
});

//Create a model
var Todo = mongoose.model('Todo', todoSchema);
//Here is the test item
// var itemOne = Todo({ item: 'get flowers' }).save(function (err) {
//   if (err) throw err;
//   console.log('Item is saved');
// });

//Inside the todo method we should pass the onject that we want to provide whic is based on the schema. We save function to push the item inside the database and we fire a function when an item is saved which has error as a  parameter and inside we should say if there is an error throw that error



// var data = [{ item: 'Get milk' }, { item: 'Walk dog' }, { item: 'Kick some coding ass' }];

//This is the middleware that we wanna run in the post request
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  //Here we will set all request handlers
  //The app variable is the same that we have use to fire the express function

  //We need a get request for the url itself
  app.get('/todo', function (req, res) {
    //get the data from mongodb and pass it to the view
    //We need to specify first which model to get the data from and then use find method which is used to find either all items in the collection or particular items in the collection.Then we are gonna pass an empty item to retrieve all items from the collection as a first parameter, then the second parameter will be a callback function which has two parameters an error and the data that we retrieve
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, function (req, res) {
    //We need this to handle a post request when a user adds a new item to the list

    //Here we wanna get the item from the view to the database
    var newTodo = Todo(req.body).save(function (err, data) {
      //We will create a new variable to hold the new item and we will use req.body to get the item, then use save method to save it to the database which will have a callback function having two parameters the error and the data saved
      if (err) throw err;

      //Then we will send this data back to the todo.ejs file using json method
      res.json(data);
    });
  });



  app.delete('/todo/:item', function (req, res) {
      //Here we need to delete the requested item from mongodb
      Todo.find({ item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
        if (err) throw err;
        res.json(data);
      });

      //This is to make the user able to delete items from the list
      // data = data.filter(function (todo) {
      //Here filter will filter the data that we want to delete and we are firing a function cycling through the data variable objects and each object that we loop through is gonna be referenced as todo which is the parameter
      //The return statement below returns either true or false.If it is true, this item remains in the array, but if it is false, the item comes out of the array
      // return todo.item.replace(/ /g, '-') !== req.params.item;
    });
  //This is to send the data to the success method in the ajax
  // res.json(data);
};
