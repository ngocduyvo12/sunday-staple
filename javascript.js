//recipe page JS
$(".btn").on("click", function() {
    event.preventDefault();

    var recipe = $("#input").val().trim();
    var number = $("#FormInput2").val();

    var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=b7748014&app_key=2bee19be6b5a1adece7bce58beae50ab&from=0&to=" + number
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
            console.log(response.hits);
            var results = response.hits;
            for (var i = 0; i < results.length; i++){
                var newDiv = $("<div>").attr("id", "recipeDiv");
                var label = results[i].recipe.label;
                var img = $("<div>").html("<img src='" + results[i].recipe.image + "'/>");
                var info = $("<div>").text("Time: " + results[i].recipe.totalTime + " min.  ||  " + "Servings: " + results[i].recipe.yield)
                var url = $("<div>").html("<a href='" + results[i].recipe.url + "'>" + results[i].recipe.url + "</a>");
                $(ingredients).append(line)
                var arr = results[i].recipe.ingredientLines
                console.log(arr)
                var ingredients = $("<ul>")
                for (var j = 0; j < arr.length; j++){
                    console.log(arr[j])
                    var line = $("<li>").text(arr[j])
                    ingredients.append(line)
                }
                var button = $("<button>").addClass("ingredient-shopping-list").text("Add to Shopping List")
            newDiv.prepend(label, img, info, button, ingredients, url);
            $(".list-of-recipes").append(newDiv);
            }
        })
})
//write a function that will take in an array and loop through randomly to select the number of recipes desired. Then each loop through splice(take out) the index that was selected so that the same recipe doesn't show more than once.
//shopping list page JS
function renderItems(){
  $("#shopping-list-items").empty()

  items.forEach(function (item, i){
    var shoppingItem = $("<p>");
    shoppingItem.text(item);

    var itemClose = $("<button>")
    itemClose.attr("data-item", i);
    itemClose.addClass("checkbox");
    itemClose.text("x");
   
    shoppingItem = shoppingItem.prepend(itemClose);

    $("#shopping-list-items").append(shoppingItem);
  });
};
$("#add-item").on("click", function (event) {
  event.preventDefault();

  var itemName = $("#item").val().trim();

  items.push(itemName);

  localStorage.setItem("items", JSON.stringify(items));

  renderItems();

  $("item").val("");
});
$("#shopping-list-items").on("click", ".checkbox", function(){
    var index = $(this).attr("data-item");

    items.splice(index, 1);

    localStorage.setItem("items", JSON.stringify(items));

    renderItems();
});
var items = JSON.parse(localStorage.getItem("items")) || [];
renderItems();



// var firebaseConfig = {
//   apiKey: "AIzaSyDsspV72wb_2Bsi_-hOugHnL_kxevXEYpU",
//   authDomain: "project-1-sunday-staples.firebaseapp.com",
//   databaseURL: "https://project-1-sunday-staples.firebaseio.com",
//   projectId: "project-1-sunday-staples",
//   storageBucket: "",
//   messagingSenderId: "191809197009",
//   appId: "1:191809197009:web:b08231f68a1d639696c6f0"
// };

// firebaseConfig.initializeApp(firebaseConfig);
// var database = firebase.database();
