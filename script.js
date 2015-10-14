$(document).ready(function(){
//words to be pulled at random for the game
//add approx. 30 words
var words = ["help", "peer", "spell", "level", "hear", "game", "space", "index", "banana", "grape", "fruit", "flint", "landed", "goats", "grudge", "helper", "wraper", "grapefruit", "suspicious", "finalist", "decision", "healer", "squash", "reaching", "modestly", "camper", "smashed", "vehicle"]

var checkWinner = false;

$('.tooltipped').tooltip({delay: 50});

  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
    }
  );
    


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

//timer 
var count = 6;
   var myFunc = function(){
       if (count === 1){
           count = 7
       }
       count --
       $('.displayTimer').text(count)
   }


//divs to show and hide
$('#play').click(function() {
	console.log("Called2")
	$('.gameboard').show();
	$('.pageOne').hide();
});

//   


$('.startGame').on("click", function() {
	$('.startGame').hide();
	newWord();
	var tryThis = setInterval(myFunc, 1000)
	newFunction();	
});


//new word every 6 seconds
var changeWord = null;
function newFunction (){
	changeWord = setInterval (duration, 6000)
};


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

//alert when word is correct
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



//scoring 
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


// $('.reset').click(function(e) {
// 	e.preventDefault() 


// 	var removeArr = $('#sortable li')
// 	for (var i = 0; i < removeArr.length; i++) {
// 		console.log('removing', removeArr[i])
// 		removeArr[i].remove();
// 	};
// 	newWord();
// });

//page three: game 

//timer function for player 1 and player 2 - MAYBE -- set .on('timerUp') to switch to other player-- is this possible?

var duration = function () {
	console.log("interval trigger")
	if (currentPlayer === "playerOne") {
		currentPlayer = "playerTwo";
		$('.whichTurn h4').text("Player Two");
	} else if (currentPlayer === "playerTwo") {
		currentPlayer = "playerOne";
		$('.whichTurn h4').text('Player One');
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
