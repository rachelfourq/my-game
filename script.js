$(document).ready(function(){
//words to be pulled at random for the game
//add approx. 30 words
var words = ["help", "peer", "spell", "level", "hear", "game", "space", "index", "sinks", "grape", "fruit", "flint", "landed", "goats", "grudge", "helper", "wraper", "glare", "saint", "giant", "yearn", "storm", "squash", "reach", "strike", "camper", "smashed", "gear", "flown", "filth", "cereal", "change", "vault", "school", "brown"]

var checkWinner = false;

//Materialize shiz
$('.tooltipped').tooltip({delay: 50});

$('.modal-trigger').leanModal({
	dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    }
  );
    
//timer 
var count = 8;
   var myFunc = function(){
       if (count === 1){
           count = 9
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

$('.startGame').on("click", function() {
	$('.startGame').hide();
	newWord();
	var tryThis = setInterval(myFunc, 1000)
	newFunction();	
});

//new word every 6 seconds
var changeWord = null;
function newFunction (){
	changeWord = setInterval (duration, 8000)
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
	swal("Good job!", "That's the word!", "success")
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

	if ((playerOneScore === 5) || (playerTwoScore === 5)){
		swal("Game Over!", "Well played!")
		clearInterval(changeWord)
		checkWinner = true;
		$('.confirm').click(function(){
			location.reload();
		})
	}
}


});
