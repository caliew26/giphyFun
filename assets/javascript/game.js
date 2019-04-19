//setting global variable
var topics = ["Mickey Mouse", "Minnie Mouse", "Donald Duck", "Daisy Duck","Huey Duck", "Dewey Duck", "Scrooge McDuck", "Goofy", "Pluto", "Peter Pan", "Cinderella", "Jasmine", "Sleeping Beauty", "Rapunzel", "Belle", "Pocahontas", "Walt Disney"];

//getting the DOM loaded/rendered
$(document).ready(function() {
    //cycle through a for loop that will cycle through the number of items in the array
    for(let i = 0; i < topics.length; i++){
        //will create a button for each iterration within the array
        createTopicButton(topics[i]);
    }
    initializeEventHandlers();
    $("#resultsWanted").text($("#myRange").val());
});

//create a function called createTopicButton and assign a parameter called newTopicText
function createTopicButton(newTopicText){
    //declare a variable and assign the element
    var btn = document.createElement("BUTTON");
    //add a bootstrap class to the element
    $(btn).addClass("btn btn-primary border border-secondary");
    //add a class to the element that will enable the eventhandler 
    $(btn).addClass("addtopicsButton");
    //add text onto the new button
    $(btn).text(newTopicText);
    //adding the button just generated to the DOM/HTML
    $("#topicsButtons").append(btn);
    //calling a function 
    topicButtonEventInitializer(btn);
    //console.log("function createTopicButton");

}

//create a function
function initializeEventHandlers(){
    //need to remove all eventhandlers from the element id
    // $("#newTopicSubmit").unbind("click");
    //user inputs a value into the box
    $("#newTopicSubmit").click(function(){
        event.preventDefault();
        //onclick. declare a variable and capture the value from the user 
        var newTopicInput = $("#newTopicInput").val().trim();
        //if the value is valid, then create a new button
        if(newButtonValid(newTopicInput)){
            //use the input provided and apply it to the button
            createTopicButton(newTopicInput);
            //add the new button to the array of topics
            topics.push(newTopicInput)
            $("#newTopicInput").val("");
            
        } else {
            //if the input provided matches the existing button, alert user to create a new character
            alert("Please add a character that is not on the current list");
        };
    });
    
    $("#newTopicInput").keyup(function(event){
        if(event.keyCode === 13) {
            $("#newTopicSubmit").click();
        //    console.log("this is the enter key stuffs");
        }
    });

    //get the range from the slider and populate it onto the html
    $("#myRange").change(function(){
        $("#resultsWanted").text($(this).val());
        console.log("")
    });

}

function topicButtonEventInitializer(button){
    $(button).click(function() {
        var numberValue = $("#myRange").val();
        getGiphyStuff($(this).text(), numberValue);
        // console.log("")
    })
}

//condition created that will not allow a user to submit if the field is blank or if using spaces
//if text for button does not equal "" (blank)
function newButtonValid (newTopicText){
    if(newTopicText != ""){
        //return the array of indexes, and if result is -1 then populate
        return topics.indexOf(newTopicText) == -1;

    } else {
        //return the array of indexes and if anything other than -1 return false which will populate the alert "Please add a character that is not on the current list"
        return false
    }
}

//function to call the api and get the gifs using the input from the user

function getGiphyStuff(queryText, valueNumber){
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=NahfTXxPEBW0emPiN880sy1Vhm8llXUy&q=" + queryText + "&limit=" + valueNumber, 
        // numberValue,
        method: "GET"
    }).then(function(response){
        //clear the gifs (this is going to happen only when the button is clicked multiple times)
        $("#placehere").empty();
        //run through the array of responses
        for(let i = 0; i < response.data.length; i++){
        //run functon that will get the arguments for the image url, the urlAnime and the rating
        gifOntoPage(response.data[i].images.downsized_still.url,response.data[i].images.downsized.url,response.data[i].rating);
        //console.log(response.data[i]);
    }
    });
}


function gifOntoPage(url,urlAnime,rating){
    //declare a variable that will create a div element on the DOM
    var gifDiv = document.createElement("div");
    //add class to div
    $(gifDiv).addClass("card");
    //delcare a variable that will create an image element on the DOM
    var gifPlaceHolder = document.createElement("img");
    //set attribute for src and url to the image DOM just declared
    gifPlaceHolder.setAttribute("src", url);
    //add an onclick event that will replace the url with a urlAnime url
    $(gifPlaceHolder).click(function(){
        //run function with urlAnime, the image (this) and original url 
        gifSwaper(urlAnime,this,url);
    });
    //add atribute of height to the image - might not need this
    // gifPlaceHolder.setAttribute("height", "768");
    //add atribute of width to the image, use % so that it will react with the page movement
    gifPlaceHolder.setAttribute("width", "40%");
    //declare a variable that will create a p(paragraph) element on the DOM
    var gifRating = document.createElement("p");
    //use variable and add a class of rating
    $(gifRating).addClass("rating card-title");
    //use variable and input text from the api call onto the DOM
    $(gifRating).text("Rating: " + rating);
    //put the declared rating variable onto the div within the DOM
    $(gifDiv).append(gifRating);
    //put the delcared image var onto the div within the DOM
    $(gifDiv).append(gifPlaceHolder);
    //put the delcared div var onto the placeholder (ID placehere) within the DOM
    $("#placehere").append(gifDiv);
}

//function that will take a "new" url and swap it from still to animated
//parameters will be to get the "newUrl", the "image" and the original "url"
function gifSwaper(newUrl,image,url){
    //set the image attribue to the newUrl (the animated one rec'd from the api call)
    image.setAttribute("src", newUrl);
    //unbind any element clicks so that I can swap out the urls (will make it animated)
    $(image).unbind("click");
    //create an onclick event that will then swap out the newUrl with the original(will make it still again)
    $(image).click(function(){
        //run the function again and change the newUrl with the original
        gifSwaper(url,image,newUrl);
    });
}

