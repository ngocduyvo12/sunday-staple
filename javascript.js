var rating = 3;
var counter = 0;
//recipe page JS
var list = JSON.parse(localStorage.getItem("recipeItems")) || [];;
var items = JSON.parse(localStorage.getItem("items")) || [];
var saved = JSON.parse(localStorage.getItem("saved")) || [];
var labels = JSON.parse(localStorage.getItem("labels")) || [];

$(".btn").on("click", function () {
  event.preventDefault();

  $(".list-of-recipes").empty()

  var recipe = $("#input").val().trim();

  var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=b7748014&app_key=2bee19be6b5a1adece7bce58beae50ab&count=20"
  console.log(queryURL)

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response.hits);
    var results = response.hits;
    for (var i = 0; i < 1; i++) {
      var newDiv = $("<div>").attr("id", "recipeDiv" + i);
      var hit = Math.floor(Math.random() * results.length)
      console.log(results[hit])

      console.log(results)
      var label = results[hit].recipe.label ;
      var title = $("<div>").html("<a href='" + results[hit].recipe.url + "'>" + "Recipe : " + label + "</a>");
      var img = $("<div>").html("<img data-label='" + label + "' class='recipeImg' src='" + results[hit].recipe.image + " '/>");
      var info = $("<div>").text("Time: " + results[hit].recipe.totalTime + " min.  ||  " + "Servings: " + results[hit].recipe.yield)
      var url = results[hit].recipe.url
      saved.push(results[hit].recipe.url)
      labels.push(label)
      console.log(saved)
      var save = $("<button>").addClass("save-btn").text("Save!")
      $(ingredients).append(line)


      var arr = results[hit].recipe.ingredientLines
      console.log(list)
      var ingredients = $("<ul>")
      for (var j = 0; j < arr.length; j++) {
        console.log(arr[j])
        var line = $("<li>").text(arr[j])
        var item = arr[j]
        ingredients.append(line)
        var button = $("<button>").addClass("ingredient-shopping-list").text("Add to Shopping List")
        list.push(item)
        results.splice(hit, 1);
      }
      newDiv.prepend(title, save, img, info, button, ingredients);
      $(".list-of-recipes").append(newDiv);
    }
    $("#input").val("")
  })
})

function renderItems() {
  $("#shopping-list-items").empty()

  items.forEach(function (item, i) {
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
  renderToScreen;
  $("#item").val("");
});

$("#shopping-list-items").on("click", ".checkbox", function () {
  var index = $(this).attr("data-item");

  items.splice(index, 1);

  localStorage.setItem("items", JSON.stringify(items));

  renderItems();
});

$("#recipe-shopping-list").on("click", ".recipe-checkbox", function () {
  console.log(list)
  var index = $(this).attr("data-item");

  list.splice(index, 1);
  console.log(list)

  localStorage.setItem("recipeItems", JSON.stringify(list));

  renderToScreen();
});

function renderSaved (){
  $(".saved-recipes").empty()

  for (var i = 0; i < saved.length; i++){
    var savedRecipe = $("<p>");
    savedRecipe.html(`<a href="${saved[i]}">${saved[i]}</a>`);

    var remove = $("<button>").attr("data-recipe", i).addClass("remove").text("Delete")

    savedRecipe = savedRecipe.prepend(labels[i] + ": ")
    savedRecipe = savedRecipe.prepend(remove)

    $(".saved-recipes").append(savedRecipe)

  }
}


$(".saved-recipes").on("click", ".remove", function () {
  var index = $(this).attr("data-recipe");

  saved.splice(index, 1);

  localStorage.setItem("saved", JSON.stringify(saved));
  localStorage.setItem("labels", JSON.stringify(labels));

  renderSaved();
})
$(".list-of-recipes").on("click", ".save-btn", function (){
  localStorage.setItem("saved", JSON.stringify(saved));
  localStorage.setItem("labels", JSON.stringify(labels));
  var url = $(this).attr("data-url")

  renderSaved()
})
$(".list-of-recipes").on("click", ".ingredient-shopping-list", function () {
  localStorage.setItem("recipeItems", JSON.stringify(list));
  renderToScreen()
})
function renderToScreen() {
   $("#recipe-shopping-list").empty()

  list.forEach((ingredient, i) => {
    var shoppingItem = $("<p>").attr("data-item", i);
    shoppingItem.text(ingredient);

    var itemClose = $("<button>")
    itemClose.attr("data-item", i);
    itemClose.addClass("recipe-checkbox");
    itemClose.text("x");

    shoppingItem = shoppingItem.prepend(itemClose);

    $("#recipe-shopping-list").append(shoppingItem);
  })
}
renderItems()
renderToScreen()
renderSaved()

//Youtube api
function searchBar() {
  $(".search-bar").append(`<input id="videoSearch" type="text"><button id="video-input" class="btn" type="submit">Search</button>`);
}
function displayVideo() {
  var searchTerm = $(this).data("label")
  console.log(searchTerm)
  searchBar();
  //google api key: AIzaSyDtueaZi7FV1QERCc2pUAeb_9S4hImUb4Y 
  var queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyDtueaZi7FV1QERCc2pUAeb_9S4hImUb4Y&maxResults=5&videoCategoryId=food`

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 0; i < response.items.length; i++) {

      console.log(response.items[i])
      var videoId = response.items[i].id.videoId;

      $(".get-video").append(`<iframe id="player" type="text/html" width="250" height="250" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" frameborder="0"></iframe>`)
    }
  })
}
function searchVideo() {
  var searchTerm = $("#videoSearch").val().trim();
  $(".get-video").empty();
  console.log($("#videoSearch").val().trim())
  var queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyDtueaZi7FV1QERCc2pUAeb_9S4hImUb4Y&maxResults=5&videoCategoryId=food`

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 0; i < response.items.length; i++) {

      console.log(response.items[i])
      var videoId = response.items[i].id.videoId;

      $(".get-video").append(`<iframe id="player" type="text/html" width="250" height="250" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" frameborder="0"></iframe>`)
    }
  })
}

$(".list-of-recipes").on("click", ".recipeImg", displayVideo)
$(".video").on("click", "#video-input", searchVideo)

// saved Recipe collapsible
$(".collapsible").on("click", function(){
  if ($(".hidden").attr("class") === "hidden") {
    $(".hidden").attr("class", "show")
  } else if($(".show").attr("class") === "show"){
    $(".show").attr("class", "hidden")
  }

})

//homepage image slideshow
var homeImages =["images/breakfast.jpg", "images/burrito.jpg", "images/chocolate.jpg", "images/fruit.jpg", "images/macroons.jpg", "images/gather.jpg", "images/pasta.jpg", "images/pie.jpg", "images/protein.jpg", "images/vegebowl.jpg"]

var showImage;

var homeImageCount = 0;

function displayHomeImage(){
  $("#home-images-slideshow").html("<img class='imageSize' src=" + homeImages[homeImageCount] + " height='250px' width='100%'>").fadeIn()
  $("img").fadeIn()
}
function nextImage(){
  homeImageCount++;
  setTimeout(displayHomeImage, 1000);
  if (homeImageCount === homeImages.length){
    homeImageCount = 0;
  }
}
function startImageSlideshow(){
  showImage = setInterval(nextImage, 10000)
}
displayHomeImage();
startImageSlideshow();

// Star Functionality
$(document).ready(function () {

});


var firebaseConfig = {

  apiKey: "AIzaSyAKq_LRm-IOOQRiqnyRP4DF_-1pOxp0gas",
  authDomain: "sunday-staples.firebaseapp.com",
  databaseURL: "https://sunday-staples.firebaseio.com",
  projectId: "sunday-staples",
  storageBucket: "",
  messagingSenderId: "473432398955",
  appId: "1:473432398955:web:1e9ba1855bf66cfeeb252e"

};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit-review").on("click", function (event) {
  event.preventDefault()

  var yourName = $("#your-name").val().trim();
  var recipeName = $("#recipe-name").val().trim();
  var comment = $("#review-comment").val().trim();

  database.ref().push({

    name: yourName,
    recipe: recipeName,
    review: comment,
    rate: rating,

  })

  $("input, textarea").val("");
  rating = 3;

});

$(".rating-stars .star").on("click", function() {
      
    $(".rating-stars .star").removeClass("selected");
    $(this).addClass("selected");
    rating = $(this).attr("data-value")

})

database.ref().on("child_added", function(childSnapshot) {
  var userName = (childSnapshot.val().name);
  var recipeTitle = (childSnapshot.val().recipe);
  var userReview = (childSnapshot.val().review);
  var userRating = (childSnapshot.val().rate);
  counter++;

  $("#reviews").append("<div id='review-" + counter + "' class='four columns'><h5>" + userName + "</h5><h4>" + recipeTitle + "</h4><p>" + userReview + "</p><i class='star star-" + userRating + "'/></div>")
  $("#reviewPage").append("<div id='review-section' class='twelve columns' <h5>" + userName + "</h5><h4>" + recipeTitle + "</h4><p>" + userReview + "</p><i class='star star-" + userRating + "'/><br></div>")
  $(`#review-${counter - 3}`).remove();

}, function (errorObj) {
  console.log("Errors handled: " + errorObject.code);
})
