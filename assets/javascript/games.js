  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  var wordChoices=["TAMIRRICE", "TRAYVONMARTIN", "ERICGARNER", "SANDRABLAND", "PHILANDOCASTILE", "ALTONSTERLING", "WALTERSCOTT", "MICHAELBROWN"];
  var lives = 13;
  var guessedLetters =[];
  var winCounter = 0;
  var loseCounter = 0;
  var messages = {
    win: 'Awesome! You won!',
    lose: 'You lose. Game over',
    guessed: "You guessed that letter already! Try again.",
    validLetter: 'Enter a letter from A - Z',
  }

  var isLetter = false;
  var alreadyGuessed = false;
  var lettersGuessed = [];
  var guessed = 0;
  var currentWord;
  var hiddenWord = [];
  var rightLetter = false;
  var winnerWinner = true;
  var wordInt;
  
  //Music
  var dir = 'music/';
  var playlist = ['Say My Name', 'Freedom', 'I Wish I Knew How It Would Feel To Be Free', 'This is America', 'Freedom', 'Change Is Gonna Come' ];
  var ext = '.mp3';
  var audio = new Audio();

  function newGame() {
    wordInt = Math.floor((Math.random() * words.length ));
    currentWord = words[wordsInt];
    console.log(currentWord);
  }

    if (hiddenWord.length !== currentWord.length) {
        hiddenWord = [];
  }
    for (var i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === " ") {
          hiddenWord[i] = " ";
      } else {
        hiddenWord[i] = (" _ ");
      }   
  }
  $('#hiddenWord').html(hiddenWord);

document.onkeyup = function(event) {
  var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
  var enter = (event.keyCode);
  audio.pause();
  if (enter == 13) {
    newGame();
  }
  for (var i = 0; i < alphabet.length; i++) {
    if (userGuess === alphabet.charAt(i)) {
      isLetter = true;
    }
  }
  if (isLetter == false && enter != 13) {
    $('messages').html(messages.validLetter);
  }
  for (var i = 0; i <lettersGuessed.length; i++) {
    if (userGuess === hiddenWord[i]) {
      alreadyGuessed = true;
    }
  }
  for (var i = 0; i < hiddenWord.length; i++) {
    if (userGuess == hiddenWord[i]) {
      alreadyGuessed = true;
    }
  }
  if (alreadyGuessed == true) {
    $('#messages').html(messages.guessed);
  }
  //Checks for matched letter and insert into hiddenWord array
  for (var i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === userGuess) {
        hiddenWord[i] = currentWord[i];
        rightLetter = true;
    }
  }
  //Pushes letters guessed into an array and takes life for wrong guess.
  if (isLetter == true && alreadyGuessed == false && rightLetter == false) {
    lettersGuessed.push(userGuess);
    lives--;
    $('#lives').html(lives);
  }
  $('#lettersGuessed').html(lettersGuessed);
  $('#hiddenWord').html(hiddenWord);

  if (lettersGuessed.length == 12) {
    $('#messages').html(messages.lose);
    lettersGuessed = [];
    $('lettersGuessed').html(lettersGuessed);
    loseCounter++;
    $('#loseCounter').html(loseCounter);
    lives = 12;
    newGame();
  }
//Resets booleans 
rightLetter = false;
isLetter = false;
alreadyGuessed = false;

if (enter != 13) {
  win();
}
}
function win() {
  for (var i = 0; i < currentWord.length; i++) {
    if (hiddenWord[i] == " _ ") {
      winnerWinner = false; 
    }
  }
  if (winnerWinner == true) {
    $('#messages').html(messages.win);
  }
  for (var i = 0; i < playlist.length; i++) {
    if (wordInt === i) {
      audio.src = dir + playlist[i] + ext;
      audio.play();
    }
  }
  winsCounter++;
  $('#winCounter').html(winCounter);
  lettersGuessed = [];
  $('#letterGuessed').html(lettersGuessed);
  lives = 12;
  $('#lives').html(lives);

  newGame();
}
winnerWinner = true;
  