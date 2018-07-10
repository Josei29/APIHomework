$(document).ready(function(){
    // Create The Array That Contains The Name Of Gifs
    var GifName = ["Dog", "Cat", "Monkey", "Tiger"];

    // Creating The Buttons
    function Buttons() {
        for (var i = 0; i < GifName.length; i++) {
            var NewButton = $("<button>");
            var ButtonText = NewButton.text(GifName[i]);
            $("#Buttons").append(ButtonText);
            NewButton.addClass("Selection");
        } // For
        Search();
    } // Function

    // Add New Buttons
    $("#NewButton").submit(function(e) {
        e.preventDefault();
    });

    $(".Submit").on("click", function() {
        var NewWord = $(".Area")["0"].value.toLowerCase();
        var G = 0;

        for (var i = 0; i < GifName.length; i++) {
            var Check = GifName[i].toLowerCase();
            if (NewWord !== Check) {
                G++;
            } // If 
            else {
                $(".Area").val("");
            } // Else
        } // For

        if (G === GifName.length) {
            NewWord = $(".Area")["0"].value;
            GifName.push(NewWord);
            $("#Buttons").html("");
            Buttons();
        } // If
    });

    Buttons();

    var ApiKey = "8PG48bCZtNIMMrQJ6Gff8tKpLJlinEVc";

    function Search() {
        $(".Selection").on("click", function() {
            $("#Content").html("");
            $("#Rating").html("");
            var GIF = $(this)[0].textContent;
            var QueryUrl = "https://api.giphy.com/v1/stickers/search?api_key=" + ApiKey + "&q=" + GIF + "&limit=10&offset=0&rating=R&lang=en";
            $.ajax({
                    url: QueryUrl,
                    method: "GET"
                }).done(function(response) {
                    console.log(response);
                    for (var i = 0; i < response.data.length; i++) {
                        var ImageUrl = response.data[i].images["480w_still"].url;
                        var Moving = response.data[i].images.original.url;
                        var NewImg = $("<img>");
                        NewImg.attr("src", ImageUrl);
                        NewImg.attr("data-moving", Moving);
                        NewImg.attr("data-still", ImageUrl);
                        NewImg.attr("alt", GIF + " image");
                        NewImg.attr("class", "Moving");
                        var NewDiv = $("<div>");
                        NewDiv.addClass("Rating");
                        NewDiv.text("Rating: " + response.data[i].rating);
                        $("#Content").append(NewDiv);
                        $("#Content").append(NewImg);
                    }
                    $(".Moving").on("click", function() {
                        console.log($(this)["0"].currentSrc);
                        var Url = $(this)["0"].currentSrc;
                        var MoveUrl = $(this)["0"].dataset.moving;
                        var StillUrl = $(this)["0"].dataset.still;
                        if (Url !== MoveUrl) {
                            console.log("Hi");
                            $(this).attr("src", MoveUrl);
                        }
                        else {
                            console.log("Bye");
                            $(this).attr("src", StillUrl);
                        }
                    });
                });
        });
    }

}); // Document Ready