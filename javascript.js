//recipe page JS
var list = {}
var items = JSON.parse(localStorage.getItem("items")) || [];

$(".btn").on("click", function() {
    event.preventDefault();

    var recipe = $("#input").val().trim();
    var number = $("#FormInput2").val();

    var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=b7748014&app_key=2bee19be6b5a1adece7bce58beae50ab&count=20"
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
            console.log(response.hits);
            var results = response.hits;
            for (var i = 0; i < number; i++){
                var newDiv = $("<div>").attr("id", "recipeDiv" + i);
                var hit = Math.floor(Math.random()*results.length)
                console.log(results[hit])
                results.splice(hit, 1);
                console.log(results)
                var label = results[i].recipe.label;
                var img = $("<div>").html("<img data-label='"+label+"' class='recipeImg' src='" + results[i].recipe.image + " '/>");
                var info = $("<div>").text("Time: " + results[i].recipe.totalTime + " min.  ||  " + "Servings: " + results[i].recipe.yield)
                var url = $("<div>").html("<a href='" + results[i].recipe.url + "'>" + results[i].recipe.url + "</a>");
                $(ingredients).append(line)


                var arr = results[i].recipe.ingredientLines
                arr.map((item, index) => {
                  return list[index] = item
                })
                console.log(list)
                var ingredients = $("<ul>")
                for (var j = 0; j < arr.length; j++){
                    console.log(arr[j])
                    var line = $("<li>").text(arr[j])
                    ingredients.append(line)
                var button = $("<button>").addClass("ingredient-shopping-list").text("Add to Shopping").attr("data-ingredients", arr)
                }
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
  getLocalStorage();

  $("item").val("");
});
$("#shopping-list-items").on("click", ".checkbox", function(){
    var index = $(this).attr("data-item");

    items.splice(index, 1);

    localStorage.setItem("items", JSON.stringify(items));

    renderItems();
});
function renderIngredients(){ 
  $("#shopping-list-items").empty()

  shoppingIngredients.forEach(function (item, i){
    var shoppingItem = $("<p>");
    shoppingItem.text(item);

    var itemClose = $("<button>")
    itemClose.attr("data-item", i);
    itemClose.addClass("checkbox");
    itemClose.text("x");
   
    shoppingItem = shoppingItem.prepend(itemClose);

    $("#shopping-list-items").append(shoppingItem);
  })
};
$(".list-of-recipes").on("click", ".ingredient-shopping-list", function(){
  localStorage.setItem("recipeItems", JSON.stringify(list));
  getLocalStorage()
})
function createItem(str){
  var shoppingItem = $("<p>");
    shoppingItem.text(str);

    var itemClose = $("<button>")
    itemClose.attr("data-item", i);
    itemClose.addClass("checkbox");
    itemClose.text("x");

    shoppingItem = shoppingItem.prepend(itemClose);

    $("#shopping-list-items").append(shoppingItem);
}
function renderToScreen(str){
  var shoppingListObject = JSON.parse(str)
  var ingredientsArr = Object.values(shoppingListObject)
  ingredientsArr.forEach((ingredient, i) => {
    var shoppingItem = $("<p>");
    shoppingItem.text(ingredient);

    var itemClose = $("<button>")
    itemClose.attr("data-item", i);
    itemClose.addClass("checkbox");
    itemClose.text("x");

    shoppingItem = shoppingItem.prepend(itemClose);

    $("#shopping-list-items").append(shoppingItem);
  })
}
function getLocalStorage(){
  var localStorageString = localStorage.getItem("recipeItems")
  renderToScreen(localStorageString);
}
renderItems()
getLocalStorage()
//Youtube api
function displayVideo(){
  var searchTerm = $(this).data("label")
    console.log(searchTerm)
    //google api key: AIzaSyDtueaZi7FV1QERCc2pUAeb_9S4hImUb4Y 
    var queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyDtueaZi7FV1QERCc2pUAeb_9S4hImUb4Y&maxResults=1`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response.items[0].id.videoId)
        var videoId = response.items[0].id.videoId;

        $(".video").append(`<iframe id="player" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" frameborder="0"></iframe>`)
    })
}

$(".list-of-recipes").on("click", ".recipeImg", displayVideo)
