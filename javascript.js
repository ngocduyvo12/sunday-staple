var rating = 3;

$(".btn").on("click", function() {
    event.preventDefault();

    var recipe = $("#input").val().trim();
    var number = $("#FormInput2").val();

    var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=770fa15d&app_key=bec3be67236b3eff20ab49f890b049bd&from=0&to=" + number
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
                var img = $("<div>").html("<img data-label='"+label+"' class='recipeImg' src='" + results[i].recipe.image + " '/>");
                var info = $("<div>").text("Time: " + results[i].recipe.totalTime + " min.  ||  " + "Servings: " + results[i].recipe.yield)
                var url = $("<div>").html("<a href='" + results[i].recipe.url + "'>" + results[i].recipe.url + "</a>");
                $(ingredients).append(line)
                var arr = results[i].recipe.ingredientLines
                console.log(arr)
                var ingredients = $("<ul>")
                for (var j = 0; j < arr.length; j++){
                    console.log(arr[j])
                    var line = $("<li>").text(arr[j])
                }
           
            newDiv.prepend(label, img, info, ingredients, url);
            $(".list-of-recipes").append(newDiv);
            }
        })
})

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


// Star Functionality
  $(document).ready(function (){
  
  
    // $('#stars li').on('mouseover', function (){

    //   var onStar = parseInt($(this).data('value'), 10);
     
    //   $(this).parent().children('li.star').each(function (e){
    //     if (e < onStar) {
    //       $(this).addClass('hover');
    //     }
    //     else {
    //       $(this).removeClass('hover');
    //     }
    //   });
      
    // }).on('mouseout', function (){

    //   $(this).parent().children('li.star').each(function(e){
    //     $(this).removeClass('hover');
    //   });

    // });
    
    

    // $('#stars li').on('click', function (){

    //   var onStar = parseInt($(this).data('value'), 10); 
    //   var stars = $(this).parent().children('li.star');
      
    //   for (i = 0; i < stars.length; i++) {
    //     $(stars[i]).removeClass('selected');
    //   }
      
    //   for (i = 0; i < onStar; i++) {
    //     $(stars[i]).addClass('selected');
    //   }
    //   console.log($(this))
    //   rating = $(this).attr("data-value");
    //   console.log(rating)
      
    // });
       
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

  $("#submit-review").on("click", function(event) {
      event.preventDefault()
      console.log("clicked")

      var yourName = $("#your-name").val().trim();
      var recipeName = $("#recipe-name").val().trim();
      var comment = $("#review-comment").val().trim();
    
      console.log(rating)

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

    $("#reviews").append("<h5>" + userName + "</h5><h4>" + recipeTitle + "</h4>,<p>" + userReview + "</p><i class='star star-" + userRating + "'/>")

  }, function(errorObj) {

    console.log("Errors handled: " + errorObj.code);

  });


