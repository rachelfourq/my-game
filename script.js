$(document).ready(function(){
//words to be pulled at random for the game
//add approx. 30 words
var words = ["help", "peer", "spell", "level", "hear", "game", "space", "index", "banana", "grape", "fruit", "flint", "landed", "goats", "grudge", "helper", "wraper", "grapefruit", "suspicious", "finalist", "decision", "healer", "squash", "reaching", "modestly", "camper", "smashed", "vehicle"]

var checkWinner = false;

//console.log(words);

// var randomWord = words[Math.floor(Math.random()*words.length)];

//think about writing a function using pop, push and splice to 
//take randomWord, make it an array, and then shuffle the array,
//then push it back as a scrambled word.

//GO WITH THIS ONE. alternate way that is much shorter and easier :)
// var shuffled = randomWord.split('').sort(function(){return 0.5-Math.random()}).join('');

// var splitWord = shuffled.split('');

// for (var i = 0; i < splitWord.length; i++) {
// 	var newLi = $("<li class='myclass'></li>").html(splitWord[i]);
// 	$('#sortable').append(newLi);

// };

// $('.btn btn-default').popover();

 var container = $(".pageOne");
 var display; // this will be the Solari Display object

window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame; // you'll need support for rAF

window.addEventListener( 'load', function() { // once the page loads

    // create a SolariDisplay

    /*
        parameters:
        container - the element that will contain the display
        format - an array of either a single character or an array of characters. 
            The length of this format array is the number of segments.
            There are several defines ready to use:
                CTR.SOLARIVALUES.letter: A to Z and space
                CTR.SOLARIVALUES.number: 0 to 9
                CTR.SOLARIVALUES.hour: 00 to 23
                CTR.SOLARIVALUES.minute: 00 to 59
        segmentWidth: the width in pixels of a single segment
        segmentHeight: the height in pixels of a single segment
        fontSize: the size of the font in pixels
    */

    display = new CTR.SolariBoard( {
        container: container,
        format: [ 
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter,
            CTR.SOLARIVALUES.letter
         ],
        segmentWidth: 70,
        segmentHeight: 120,
        fontSize: 100
    } );

    // update the content of the display
    display.setContent( 'HELLO WORLD' );

}, false );


$('#play').click(function() {
	// console.log("Called2")
	$('.pickPlayer').show();
	$('.pageOne').hide();
});

$('.pickPlayer').on("click", 'button', function() {
	$('.pickPlayer').hide();
	$('.gameboard').show();
	
	newFunction();	
});


var changeWord = null;
function newFunction (){
	changeWord = setInterval (duration, 6000)
};

$('#btn-giveaway').click(function() {

	$('.container').hide();
	$('#giveaway_container').show();
});


var getWord = function(){
	return words[Math.floor(Math.random()*words.length)];
}

var currentWord = ''

var newWord = function () {
	var randomWord = getWord()
	console.log('hitting',randomWord)
	currentWord = randomWord;

	var shuffled = randomWord.split('').sort(function(){return 0.5-Math.random()}).join('');
	var splitWord = shuffled.split('');
	console.log("new word click")
	for (var i = 0; i < splitWord.length; i++) {
		var newLi = $("<li class='myclass'></li>").html(splitWord[i]);

		$('#sortable').append(newLi);
	};
	return randomWord
}


// var randomWord = newWord();


$('#sortable').sortable();

var rearrange = function() {
	var wordArray = $("#sortable li")
	var playersWord = '';
	for (var i = 0; i < wordArray.length; i++) {
		playersWord = playersWord+wordArray[i].innerHTML;
	};
	return playersWord;
};

$('#sortable').on("mousemove", (function() {
// console.log(randomWord)
// console.log('re',rearrange())
if (currentWord === rearrange()) {
	swal("Good job!", "You clicked the button!", "success")
	var newRandomWord = currentWord
	currentWord = ''
	score();
	if (currentPlayer === "playerOne") {
		currentPlayer = "playerTwo";
	} else if (currentPlayer === "playerTwo") {
		currentPlayer = "playerOne";
	}
}
}));


//page one: how to play | let's play

//page two: one play | two player

var currentPlayer = "playerOne";
var playerOneScore = 0;
var playerTwoScore = 0;

var score = function () {
	if (currentPlayer === "playerOne") {
		playerOneScore++;
		checkScore()
		console.log(playerOneScore);
		$('.score1').text(playerOneScore);
	} else if (currentPlayer === "playerTwo") {
		playerTwoScore++;
		checkScore()
		console.log(playerTwoScore);
		$('.score2').text(playerTwoScore);
	}

};


$('.reset').click(function(e) {
	e.preventDefault() 

	var removeArr = $('#sortable li')
	for (var i = 0; i < removeArr.length; i++) {
		console.log('removing', removeArr[i])
		removeArr[i].remove();
	};
	newWord();
});

//page three: game 

//timer function for player 1 and player 2 - MAYBE -- set .on('timerUp') to switch to other player-- is this possible?

var duration = function () {
	console.log("interval trigger")
	if (currentPlayer === "playerOne") {
		currentPlayer = "playerTwo";
		$('.whichTurn h1').text("Player Two");
	} else if (currentPlayer === "playerTwo") {
		currentPlayer = "playerOne";
		$('.whichTurn h1').text('Player One');
	}
	var removeArr = $('#sortable li')
	for (var i = 0; i < removeArr.length; i++) {
		console.log('removing', removeArr[i])
		removeArr[i].remove();
	};
	newWord();

}

//play to 5 function
var checkScore = function (){
	console.log('hitting function')
	// console.log(playerOneScore);
	// console.log(playerTwoScore);

	if ((playerOneScore === 5) || (playerTwoScore === 5)){
		swal('game over');
		clearInterval(changeWord)
		checkWinner = true;
	}
}








});
