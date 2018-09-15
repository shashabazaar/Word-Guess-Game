window.onload = function() {
	var userGuess;
	var words = ["TAMIRRICE", "TRAYVONMARTIN", "ERICGARNER", "SANDRABLAND", "PHILANDOCASTILE", "ALTONSTERLING", "WALTERSCOTT", "MICHAELBROWN"];
	var word = [];
	var positions = [];
	var guessedLetters = [];
	var guesses;
	var wins;
	var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var count = 0;
  var toHide = [".purple",".gold",".wins",".brown",".positions",".purple",".guesses",".pink",".letters-guessed"]; }
  
  // Set inital wins
	wins = 0;
	document.querySelector(".wins").innerHTML = wins;
	// Select the first word
	var num = 0;
  newWord(num);
  
  // Set initial guesses
	guesses = 7;
  document.querySelector(".guesses").innerHTML = guesses;
  
  // Show hangman
	for (var i=0; i<=guesses; i++) {
		document.querySelector(".hangman").innerHTML += '<img class="guess' + i + '" src="/assets/images/emmittamir.jpg">';
		if (i != guesses) {
			document.querySelector(".guess" + i).style.visibility = 'hidden';
		}
	}
  function newWord(num) {
		// Clear positions and guesses
		guesses = 7;
		document.querySelector(".guesses").innerHTML = guesses;
		positions = [];
		guessedLetters = [];
    document.querySelector(".letters-guessed").innerHTML = guessedLetters.join(" ");
    // Set positions of intial word and display
		word = words[num].split("");
		for (var i=0; i<word.length; i++) {
			positions.push("_");
    }
  }

  document.querySelector(".positions").innerHTML = positions.join(" ")

  // Listen for keystrokes
  document.onkeyup = function(event) {
    // Reset non-letter and already-guessed
      document.querySelector(".red").innerHTML = "";
      
      // Get letter from player, check if already guessed, then replace letter
			if (event.keyCode >= 65 && event.keyCode <= 90) {
				userGuess = String.fromCharCode(event.keyCode).toUpperCase();
				checkGuessed(userGuess);
			} else {
				document.querySelector(".red").innerHTML = "Please press a letter";
      }
      
      // Check to see if player won or lost
      checkWin();
    }

    // Media query to add input for mobile devices
		if (window.matchMedia("(max-width: 780px) and (orientation: portrait)").matches) {

			/* the viewport is less than 640 pixels wide */
			// Add arrows, letter, and guess
      document.querySelector(".media-input").innerHTML = '<button class="left"><</button><div class="letters"></div><button class="right">></button><button class="guessLetter">Guess</button>';
      
			// Change directions
      document.querySelector(".green").innerHTML = "Press the arrows to change letter!";
      
			// Show first letter A
      document.querySelector(".letters").innerHTML = alphabet[count];
      
			// Move to left letter
			document.querySelector(".left").addEventListener("click", function(){
			    if (count == 0) {
					count = 25;
				} else {
					count--;
				}
				document.querySelector(".letters").innerHTML = alphabet[count];
      });
      
      // Move to right letter
			document.querySelector(".right").addEventListener("click", function(){
        if (count == 25) {
        count = 0;
      } else {
        count++;
      }
      document.querySelector(".letters").innerHTML = alphabet[count];
    });

    // Guess letter
			document.querySelector(".guessLetter").addEventListener("click", function(){

        // Reset non-letter and already-guessed
      document.querySelector(".red").innerHTML = "";

      // Get letter from player, check if already guessed, then replace letter
      checkGuessed(document.querySelector(".letters").innerHTML);

      // Check to see if player won or lost
      checkWin();
    });
  }

function checkGuessed(userGuess) {

  // Check to see if letter matches any letters in word
  check: {
    for (var i=0; i<guessedLetters.length; i++) {
      if (guessedLetters[i] == userGuess) {
        document.querySelector(".red").innerHTML = "You already guessed this letter";
        break check;
      }
    }
    for (var i=0; i<positions.length; i++) {
      if (positions[i] == userGuess) {
        document.querySelector(".red").innerHTML = "You already guessed this letter";
        break check;
      }
    }
    replacements(userGuess);
  }
}

function replacements(userGuess) {
  // Check to see if letter matches any letters in word
  var replacements = 0;
  for (var i=0; i<word.length; i++) {
    if (word[i] == userGuess) {
      positions[i] = word[i];
      replacements++;
    }
  }

  if (replacements == 0) {
    // If no replacements reduce guesses
    guesses--;

    // Display guesses
    document.querySelector(".guesses").innerHTML = guesses;

    // Display new hangman
    document.querySelector(".guess" + String(guesses+1)).style.visibility = 'hidden';
    document.querySelector(".guess" + guesses).style.visibility = 'visible';

    // Push and display guessed letters
    guessedLetters.push(userGuess);
    document.querySelector(".letters-guessed").innerHTML = guessedLetters.join(" ");
  } else {

    // Redisplay positions
    document.querySelector(".positions").innerHTML = positions.join(" ");
  }
}

function checkWin() {
  // Check if all underscores are replaced
  winning: {
    for (var i=0; i<positions.length; i++) {
      if (positions[i] == "_") {
        break winning;
      }
    }

    // Update and display wins
			wins++;
      document.querySelector(".wins").innerHTML = wins;
      
			// Show answer
			answer("C");
		}
		// Check if guess reaches 0
		if (guesses == 0) {
			answer("Inc");
		}
  }

  function answer(letter) {
		// Hide instructions
		for (var i=0; i<toHide.length; i++) {
			document.querySelector(toHide[i]).style.visibility = "hidden";
    }
    
    // Show answer
		document.querySelector(".response").innerHTML = letter + "orrect! Its " + words[num] + "!";
		document.querySelector(".character").innerHTML = '<img src="assets/images/' + words[num] + '.png">';

    // Position Trayvon properly
		if (words[num] == 'TRAYVONMARTIN' || words[num] == 'SANDRABLAND') {
			document.querySelector(".answer").className += ' moveRight';
		} else {
			document.querySelector(".answer").className = 'answer';
    }
    
    // Any key restarts game
    document.querySelector(".anykey").innerHTML = "Press any key to continue";
    
		// Listen for key to reset
		document.onkeyup = function(event) {
			answerReset();
    }
    
    // Any key restarts game
		document.querySelector(".left").addEventListener("click", function(){
      answerReset();
  });
  document.querySelector(".right").addEventListener("click", function(){
      answerReset();
  });

  // Listen for press to reset
  document.querySelector(".guessLetter").addEventListener("click", function(){
    answerReset();
});
}

function answerReset() {
  // Reset answer
  document.querySelector(".response").innerHTML = "";
  document.querySelector(".character").innerHTML = "";
  document.querySelector(".anykey").innerHTML = "";

  // Show instructions
  for (var i=0; i<toHide.length; i++) {
    document.querySelector(toHide[i]).style.visibility = "visible";
  }
  // Show hangman
  for (var i=0; i<=7; i++) {
    if (i != 7) {
      document.querySelector(".guess" + i).style.visibility = 'hidden';
    } else {
      document.querySelector(".guess" + i).style.visibility = 'visible';
    }
  }
  // Select new word
  selectNewWord();
}

function selectNewWord() {
  num++;
  // Keep selecting new words when available
  if (num < words.length) {
    // Select new word
    newWord(num);
  } else {
    // Reset num
    num = 0;
    newWord(num);
  }
}
