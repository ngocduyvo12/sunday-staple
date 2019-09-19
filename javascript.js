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
                var newDiv = $("<div>");
                var label = results[i].recipe.label;
                var img = $("<div>").html("<img src='" + results[i].recipe.image + "'/>");
                var info = $("<div>").text("Time: " + results[i].recipe.totalTime + " min.  ||  " + "Servings: " + results[i].recipe.yield)
                var url = $("<div>").html("<a href='" + results[i].recipe.url + "'>" + results[i].recipe.url + "</a>");
                var arr = results[i].recipe.ingredientLines
                console.log(arr)
                var ingredients = $("<ul>")
                for (var j = 0; j < arr.length; j++){
                    console.log(arr[j])
                    var line = $("<li>").text(arr[j])
                    $(ingredients).append(line)
                }
            newDiv.prepend(label, img, info, ingredients, url);
            $(".list-of-recipes").append(newDiv);
            }
        })
})