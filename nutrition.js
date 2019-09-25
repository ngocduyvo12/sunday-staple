$("#search-ingredient").on("click", function () {
    event.preventDefault();

    var ingredient = $("#input").val().trim();
    var ingredientEncode = ingredient.replace(" ", "%20")
    var number = $("#qtyInput").val();
    //create ratio to calculate serving
    var ratio = number / 100;

    if (!ingredient){
        $("#input").attr("class","input-false")
    }
    else {
        $("#input").attr("class","input-true")
    }

    if (!number){
        $("#qtyInput").attr("class","input-false")
        return false;
    }
    else {
        $("#qtyInput").attr("class","input-true")
    }

    console.log(ingredientEncode)
    //app key: ae848bd342699ecbf0e61c343bf3588c
    //app id: 6ef4bc8b
    //get nutrient per 100g
    var queryURL = `https://api.edamam.com/api/food-database/parser?ingr=${ingredientEncode}&app_id=6ef4bc8b&app_key=ae848bd342699ecbf0e61c343bf3588c&nutrients`

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //empty out existing result
        $("#table-row").empty()

        for (var i = 0; i < 5; i++) {
            var label = response.hints[i].food.label;
            var kCal = response.hints[i].food.nutrients.ENERC_KCAL; //energy in kcal
            var kCal = kCal*ratio;
            var fat = response.hints[i].food.nutrients.fat; //fat in g
            if (fat) {
                var fatTrimmed = fat*ratio;
                var fatTrimmed = fatTrimmed.toFixed(2)
            }

            var dietFiber = response.hints[i].food.nutrients.FIBTG; //dietary fiber in g
            if (dietFiber) {
                var fiberTrimmed = dietFiber*ratio
                var fiberTrimmed = fiberTrimmed.toFixed(2)
            }

            var protein = response.hints[i].food.nutrients.PROCNT; //protein
            if (protein) {
                var proteinTrimmed = protein*ratio
                var proteinTrimmed = proteinTrimmed.toFixed(2)
            }

            var carb = response.hints[i].food.nutrients.CHOCDF; //carb in g
            if (carb) {
                var carbTrimmed = carb*ratio
                var carbTrimmed = carbTrimmed.toFixed(2)
            }


            console.log(fatTrimmed)
            console.log(fiberTrimmed)
            console.log(proteinTrimmed)
            console.log(carbTrimmed)



            //create table:
            $("#table-row").append(`<tr>
                <th>${number}</th>
                <th>grams</th>
                <th>${label}</th>
                <th>${kCal.toFixed(2)} kCal</th>
                <th>Fat: ${fatTrimmed || "0"} g<br>Dietary Fiber: ${fiberTrimmed || "0"} g<br>Protein: ${proteinTrimmed || "0"} g<br>Carb: ${carbTrimmed || "0"} g<br></th>
                </tr>`)

        }
    })
})