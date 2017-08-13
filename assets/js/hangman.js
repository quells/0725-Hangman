var HangmanGame = function(words) {
	this.words = words;
	this.displayWord = "";
	this.currentWord = "";
	this.guessedLetters = [];
	this.missesRemaining = 0;
	this.correctWords = new Array();
	this.missedWords = new Array();

	this.newWord = function() {
		if (this.words.length < 1) {
			throw "No more words";
		}
		var index = randomIndex(this.words);
		var rai = removeAtIndex(this.words, index);
		this.currentWord = rai.removed.toLowerCase();
		this.words = rai.remaining;
		this.displayWord = Array(this.currentWord.length + 1).join("_");
		this.missesRemaining = 5; // TODO: scale with difficulty of word
		this.guessedLetters = new Array(26).fill(false);
	};

	this.handle = function(e) {
		if (this.currentWord === "") { return; }

		// A-Z (upper and lowercase are same key code)
		if (65 <= e.keyCode && e.keyCode <= 90) {
			var letterIndex = e.keyCode-65;
			// check if letter has already been guessed
			// if letter has already been guessed, then exit
			if (this.guessedLetters[letterIndex]) {
				return;
			} else {
				this.guessedLetters[letterIndex] = true;
			}
			// check if currentWord contains letter
			var letter = String.fromCharCode(e.keyCode+32); // Uppercase -> Lowercase ASCII
			if (this.currentWord.includes(letter)) {
			// if currentWord contains letter, then reveal in displayWord
				for (var i = 0; i < this.currentWord.length; i++) {
					if (this.currentWord.charAt(i) == letter) {
						this.displayWord = replaceCharAt(this.displayWord, i, letter);
					}
				}
			} else {
			// else decrement missesRemaining
				this.missesRemaining--;
			}
			// if missesRemaining == 0, then lose round and start with new word
			if (this.missesRemaining == 0) {
				alert("Out of guesses");
				this.missedWords.push(this.currentWord);
				this.newWord();
			}
			// if displayWord is currentWord, then win round and start with new word
			if (this.currentWord == this.displayWord) {
				this.correctWords.push(this.currentWord);
				this.newWord();
			}
		}
	};

	this.refillWords = function(words) {
		alert("Ran out of words. Starting over!");
		this.words = words;
		this.correctWords = [];
		this.missedWords = [];
		this.newWord();
	};
}
