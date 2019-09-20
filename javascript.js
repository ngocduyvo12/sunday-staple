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
<<<<<<< HEAD

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

=======
>>>>>>> 0bc8d1cc051730599751852189ecebf942b9dbc6
