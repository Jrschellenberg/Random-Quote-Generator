//This code executes the printQuote function every 10 seconds.
var interval = setInterval(printQuote, 10* 1000);

//Setting up a second array as a hardcopy not a reference.
var secondQuoteArray = [];
for(var i=0; i<quotes.length; i++){
    secondQuoteArray[i] = quotes[i];
}

/* Returns a random integer between min (included) and max (included)
  Using Math.round() will give you a non-uniform distribution!
  Code Taken from the Mozilla Developer Website
*/
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// A function that takes the result from the GetRandomQuote() function
function printQuote() {
    var theQuote = getRandomQuote();
    var message;
    if(theQuote.citation===undefined && theQuote.year===undefined){
        message = "<p class=\"quote\">"+ theQuote.quote + "</p> <p class=\"source\">" + theQuote.source + " </p>";
    }else if(theQuote.citation === undefined){
        message = "<p class=\"quote\">"+ theQuote.quote + "</p> <p class=\"source\">" + theQuote.source +
            "<span class=\"year\">"+ theQuote.year + "</span> </p>";
    }else if(theQuote.year === undefined) {
        message = "<p class=\"quote\">"+ theQuote.quote + "</p> <p class=\"source\">" + theQuote.source +
            " <span class=\"citation\">"+ theQuote.citation + "</span> </p>";
    }else{
        message = "<p class=\"quote\">"+ theQuote.quote +"</p> <p class=\"source\">" + theQuote.source+" <span class=\"citation\">"+
        theQuote.citation + "</span> <span class=\"year\">"+ theQuote.year + "</span> </p>";
    }
    console.log(message);
    //Code taken from https://www.paulirish.com/2009/random-hex-color-code-snippets/
    //Code used to select a random color.
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementsByTagName("BODY")[0].style.backgroundColor = color;
    document.getElementById("loadQuote").style.backgroundColor = color;
    document.getElementById('quote-box').innerHTML = message;

}

/* A function that returns a random quote as a tempQuote.
  Removes the quotes randomly selected from the quotes array until non are left. Then repopulates the array with
  quotes.
  Function stores the randomly selected index in the var index variable. then works on the array with that index value.
 */
function getRandomQuote(){
    //once no more values left in quote, repopulate array with the values from the array copy.
    if(quotes.length===0){
        console.log("in the if statement.");
        for(var i=0; i<secondQuoteArray.length; i++){
            quotes[i] = secondQuoteArray[i];
        }
    }
    //Debugging console logs.
    //console.log("the quotes 2 array.....");
    //console.log(secondQuoteArray);
    var index = getRandomIntInclusive(0,quotes.length-1);
    var tempQuote = quotes[index];
    //removing the value from the array at the index, index
    quotes.splice(index, 1);
    //console.log("length of array");
    //console.log(quotes.length);
    return tempQuote;
}

/*
A function used to reset the Set interval timer back to 0 to not have quotes pass by too quickly.
 */
function resetTimer(){
    console.log("got in here");
    clearInterval(interval);
    interval = setInterval(printQuote, 10* 1000);
}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
document.getElementById('loadQuote').addEventListener("click", resetTimer, false);
