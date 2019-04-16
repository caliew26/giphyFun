//setting global variable
var topics = ["Mickey Mouse", "Minnie Mouse", "Donald Duck", "Daisy Duck","Huey Duck", "Dewey Duck", "Scrooge McDuck", "Goofy", "Pluto", "Peter Pan", "Cinderella", "Jasmine", "Sleeping Beauty", "Rapunzel", "Belle", "Pocahontas", "Walt Disney"];

//var topics = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

//getting the DOM loaded/rendered
$(document).ready(function() {
    //cycle through a for loop that will cycle through the number of items in the array
    for(let i = 0; i < topics.length; i++){
        //will create a button for each iterration within the array
        createTopicButton(topics[i]);
    }
});
    
//create a function called createTopicButton and assign a parameter called newTopicText
function createTopicButton(newTopicText){
    //declare a variable and assign the element
    var btn = document.createElement("BUTTON");
    //add a bootstrap class to the element
    $(btn).addClass("btn-sm");
    //add a class to the element that will enable the eventhandler 
    $(btn).addClass("topicsButton");
    //add text onto the new button
    $(btn).text(newTopicText);
    //adding the button just generated to the DOM/HTML
    $("#topicsButtons").append(btn);
    //calling the function 
    initializeEventHandlers();
}

//create a function
function initializeEventHandlers(){
    //need to remove all eventhandlers from the element id
    $("#newTopicSubmit").unbind("click");
    //when the user inputs a value into the 
    $("#newTopicSubmit").click(function(){
        var newTopicInput = $("#newTopicInput").val();
        if(newButtonValid(newTopicInput)){
            createTopicButton(newTopicInput);
            topics.push(newTopicInput)
        } else {
            alert("Please add a character that is not on the current list")
        };
    });

    $(".topicsButton").unbind("click");
    $(".topicsButton").click(function(){
        getGiphyStuff($(this).text());
    });
}

function newButtonValid (newTopicText){
    if(newTopicText != ""){
        return topics.indexOf(newTopicText) == -1
    } else {
        return false
    }
}

function getGiphyStuff(queryText){
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=NahfTXxPEBW0emPiN880sy1Vhm8llXUy&q=" + queryText + "&limit=3",
        method: "GET"
    }).then(function(response){
        $("#placehere").empty();
        for(let i = 0; i < response.data.length; i++){
        gifOntoPage(response.data[i].images.downsized_still.url,response.data[i].images.downsized.url,response.data[i].rating);
        console.log(response.data[i]);
    }
    });
}

function gifOntoPage(url,urlAnime,rating){
    var gifDiv = document.createElement("div");
    var gifPlaceHolder = document.createElement("img");
    gifPlaceHolder.setAttribute("src", url);
    // gifPlaceHolder.setAttribute("onclick", "gifSwaper('" + urlAnime + "')");
    $(gifPlaceHolder).click(function(){
        gifSwaper(urlAnime,this,url);
    });
    // gifPlaceHolder.onclick = gifSwaper(urlAnime);
    // gifPlaceHolder.setAttribute("height", "768");
    gifPlaceHolder.setAttribute("width", "40%");
    var gifRating = document.createElement("p");
    $(gifRating).addClass("rating");
    $(gifRating).text("Rating: " + rating);
    // var gifLink = document.createElement("a")
    // var gifAnime = document.createElement("a")
    // gifLink.setAttribute("href", urlanime);
    // gifAnime.setAttribute("href", urlStill);
    // $(gifPlaceHolder).append(gifAnime);
    $(gifDiv).append(rating);
    // $(gifLink).append(gifPlaceHolder);
    $(gifDiv).append(gifPlaceHolder);
    // $(gifDiv).append(gifLink);
    $("#placehere").append(gifDiv);
}

function gifSwaper(newUrl,image,url){
    image.setAttribute("src", newUrl);
    $(image).unbind("click");
    $(image).click(function(){
        gifSwaper(url,image,newUrl);
    });
};