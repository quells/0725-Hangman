var HangmanGame = function(words) {
	this.words = words;
	this.displayWord = "";
	this.currentWord = "";
	this.guessedLetters = [];
	this.missesRemaining = 0;
	this.correctWords = 0;

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

		// A-Z (upper and lowercase)
		if (65 <= e.keyCode && e.keyCode <= 90) {
			// check if letter has already been guessed
			// if letter has already been guessed, then exit
			// check if currentWord contains letter
			// if currentWord contains letter, then reveal in displayWord
			// else decrement missesRemaining
			// if missesRemaining == 0, then lose round and start with new word
		}
	};

	this.refillWords = function(words) {
		this.words = words;
	};
}
