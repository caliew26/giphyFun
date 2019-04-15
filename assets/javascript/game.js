// var topics = ["Mickey Mouse", "Minnie Mouse", "Donald Duck", "Daisy Duck","Huey Duck", "Dewey Duck", "Louie Duck", "Scrooge McDuck", "Goofy","Pluto", "Chip'n Dale", "Clarice", "Pete"];

var topics = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']


$(document).ready(function() {
    for(let i = 0; i < topics.length; i++){
        createTopicButton(topics[i]);
    }
});
    
function createTopicButton(newTopicText){
    var btn = document.createElement("BUTTON");
    $(btn).addClass("btn-sm");
    $(btn).addClass("topicsButton");
    $(btn).text(newTopicText);
    $("#topicsButtons").append(btn);
    initializeEventHandlers();
}

function initializeEventHandlers(){
    $("#newTopicSubmit").unbind("click");
    $("#newTopicSubmit").click(function(){
        var newTopicInput = $("#newTopicInput").val();
        if(newButtonValid(newTopicInput)){
            createTopicButton(newTopicInput);
            topics.push(newTopicInput)
        } else {
            alert("wrong")
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
        url: "https://api.giphy.com/v1/gifs/search?api_key=NahfTXxPEBW0emPiN880sy1Vhm8llXUy&q=" + queryText + "&limit=10",
        method: "GET"
    }).then(function(response){
        $("#placehere").empty();
        for(let i = 0; i < response.data.length; i++){
        gifOntoPage(response.data[i].images.downsized_still.url,response.data[i].images.downsized.url);
        // console.log(response.data[i].images.downsized.url)
    }
    });
}

function gifOntoPage(url,urlanime){
    var gifDiv = document.createElement("div");
    var gifPlaceHolder = document.createElement("img");
    gifPlaceHolder.setAttribute("src", url);
    // gifPlaceHolder.setAttribute("height", "768");
    gifPlaceHolder.setAttribute("width", "40%");
    var gifLink = document.createElement("a")
    gifLink.setAttribute("href", urlanime);
    $(gifLink).append(gifPlaceHolder);
    $(gifDiv).append(gifLink);
    $("#placehere").append(gifDiv);
}

//account for spaces within the newTopicText