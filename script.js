$(document).ready(function(){
//words to be pulled at random for the game
//add approx. 30 words
	var words = ["help", "peer", "spell", "level", "hear", "game", "space", "index", "banana", "grape", "fruit", "flint", "landed", "goats", "grudge", "helper", "wraper", "grapefruit", "suspicious", "finalist", "decision", "healer", "squash", "reaching", "modestly", "camper", "smashed", "vehicle"]

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
			//add sweet alert
		// alert("yay!");
		//currently not working
		swal("Nailed it!", "that's the word!", "success")
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
			console.log(playerOneScore);
			$('.score1').text(playerOneScore);
		} else if (currentPlayer === "playerTwo") {
			playerTwoScore++;
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


//if else statement to get winner/add points
	var playerOne;
	var playerTwo;
	var playerTurn=1;
 	


//append winner to player 1 or player 2

//reset game button 







});