//When the document is ready, we are gonna fire a function
$(document).ready(function () {

  //Whe we hit submit this function will be fired
  $('form').on('submit', function () {
      //The item variable is equal to the input field
      var item = $('form input');

      //This is equal to what we type in the input field
      var todo = { item: item.val() };


      //Here the ajax request
      $.ajax({
        type: 'POST',
        url: '/todo',
        //The data that we are passing is todo which is the variable above
        data: todo,
        //The success function gets the data variable in the todoController file
        success: function (data) {
          //do something with the data via front-end framework
          location.reload();
        },
      });
      return false;
    });

  //This is the delete request
  $('li').on('click', function () {
      //When we click on the item, we will fire a function
      var item = $(this).text().replace(/ /g, '-');
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function (data) {
          //do something with the data via front-end framework
          location.reload();
        },
      });
    });

});
