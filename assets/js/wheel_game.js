var WheelGame = function(phrases) {
	this.phrases = phrases;
	this.currentPhrase = [];
	this.displayPhrase = [];
	this.consonantsRemaining = 0;

	this.state = "NEW_WORD";
	this.states = ["NEW_WORD", "CHECK_FUNDS", "BUY_VOWEL", "CHECK_VOWEL", "SPINNING", "HAS_SPUN", "BANKRUPT", "CHOOSE_CONSONANT", "CHECK_CONSONANT", "CHECK_PHRASE"];
	this.allowedTransitions = {
		"NEW_WORD": ["CHECK_FUNDS"],
		"CHECK_FUNDS": ["CHECK_VOWEL", "SPINNING"],
		"CHECK_VOWEL": ["CHECK_FUNDS", "CHECK_PHRASE"],
		"SPINNING": ["HAS_SPUN"],
		"HAS_SPUN": ["BANKRUPT", "CHOOSE_CONSONANT"],
		"BANKRUPT": ["NEW_WORD", "CHECK_FUNDS"],
		"CHOOSE_CONSONANT": ["CHECK_CONSONANT"],
		"CHECK_CONSONANT": ["CHECK_FUNDS", "CHECK_PHRASE"],
		"CHECK_PHRASE": ["CHECK_FUNDS", "NEW_WORD"]
	};

	this.spinButton = undefined;

	this.savedFunds = 0;
	this.currentWordFunds = 0;
	this.lastSpin = 0;
	this.canSpinWheel = false;
	this.prompt = "";
	this.guessedLetters = [];
	this.letterToCheck = -1;

	this.canTransitionTo = function(nextState) {
		var allowed = this.allowedTransitions[this.state];
		if (allowed === undefined) { throw "Game is in invalid state"; }
		for (var i = 0; i < allowed.length; i++) {
			if (allowed[i] == nextState) { return true; }
		}
		return false;
	};

	this.transitionTo = function(nextState) {
		if (this.canTransitionTo(nextState)) {
			// console.log(this.state + " -> " + nextState);
			this.state = nextState;
			this.handleCurrentState();
			document.drawEverything();
		} else {
			throw "Cannot transition from " + this.state + " to " + nextState;
		}
	};

	this.canBuyVowel = function() {
		return this.canTransitionTo("CHECK_VOWEL") && (this.currentWordFunds + this.savedFunds >= 250);
	}

	this.inactivateVowelButtons = function() {
		var vowels = ["a", "e", "i", "o", "u"];
		for (var i = 0; i < 5; i++) {
			var vowel = vowels[i];
			var buttonElement = document.getElementById(vowel + "Button");
			buttonElement.classList.remove("inactive");
			buttonElement.classList.add("inactive");
		}
	}

	this.activateVowelButtons = function() {
		var vowels = ["a", "e", "i", "o", "u"];
		for (var i = 0; i < 5; i++) {
			var vowel = vowels[i];
			var buttonElement = document.getElementById(vowel + "Button");
			buttonElement.classList.remove("inactive");
			var letterIndex = vowel.charCodeAt(0)-32-65;
			if (this.guessedLetters[letterIndex]) {
				buttonElement.classList.add("inactive");
			}
		}
	}

	this.dealWithLetter = function(letterValue) {
		var didFindLetter = false;
		var letter = String.fromCharCode(this.letterToCheck + 97);
		for (var j = 0; j < this.currentPhrase.length; j++) {
			var chunk = this.currentPhrase[j];
			var displayChunk = this.displayPhrase[j];
			for (var i = 0; i < chunk.length; i++) {
				if (chunk.charAt(i) == letter) {
					displayChunk = replaceCharAt(displayChunk, i, letter);
					didFindLetter = true;
					this.currentWordFunds += letterValue;
					if (letterValue > 0) {
						// Ignore vowels
						this.consonantsRemaining--;
					}
				}
			}
			this.displayPhrase[j] = displayChunk;
		}
		return didFindLetter;
	}

	this.handleCurrentState = function() {
		switch (this.state) {
			case "NEW_WORD":
				if (this.phrases.length < 1) { throw "Out of phrases"; }

				this.guessedLetters = new Array(26).fill(false);
				this.currentWordFunds = 0;
				this.consonantsRemaining = 0;
				this.lastSpin = 0;
				this.canSpinWheel = false;
				this.letterToCheck = -1;

				var index = randomIndex(this.phrases);
				var rai = removeAtIndex(this.phrases, index);
				this.phrases = rai.remaining;
				this.currentPhrase = rai.removed;
				var displayPhrase = [];
				if (this.currentPhrase === undefined) { throw "Invalid phrase"; }
				for (var j = 0; j < this.currentPhrase.length; j++) {
					var chunk = this.currentPhrase[j];
					var displayChunk = "";
					for (var i = 0; i < chunk.length; i++) {
						var char = chunk.charAt(i);
						if (char == " ") {
							displayChunk += char;
						} else {
							displayChunk += "_";
							switch (char) {
								case "a":
								case "e":
								case "i":
								case "o":
								case "u":
									break;
								default:
									this.consonantsRemaining++;
									break;
							}
						}
					}
					displayPhrase.push(displayChunk);
				}
				this.displayPhrase = displayPhrase;

				this.transitionTo("CHECK_FUNDS");
				break;
			case "CHECK_FUNDS":
				this.inactivateVowelButtons();
				if (this.canBuyVowel()) {
					this.prompt = "Spin the wheel or buy a vowel.";
					this.activateVowelButtons();
				} else {
					this.prompt = "Spin the wheel.";
				}
				this.canSpinWheel = true;
				this.spinButton.classList.remove("inactive");
				break;
			case "SPINNING":
				this.spinButton.classList.add("inactive");
				this.canSpinWheel = false;
				break;
			case "HAS_SPUN":
				if (this.lastSpin == "BANKRUPT") {
					this.transitionTo("BANKRUPT");
				} else {
					this.transitionTo("CHOOSE_CONSONANT");
				}
				break;
			case "BANKRUPT":
				if (this.consonantsRemaining > 0) {
					this.currentWordFunds = 0;
					this.transitionTo("CHECK_FUNDS");
				} else {
					alert("Cannot win this round. Starting with new phrase.");
					var completedWord = document.createElement("h3");
					completedWord.innerHTML = this.currentPhrase.join(" ");
					completedWord.classList.add("missed-word");
					document.getElementById("scoreboard").appendChild(completedWord);
					this.transitionTo("NEW_WORD");
				}
				break;
			case "CHOOSE_CONSONANT":
				this.prompt = "Type a consonant.";
				break;
			case "CHECK_CONSONANT":
				if (this.letterToCheck < 0) {
					throw "Game is in invalid state";
				}
				var didFindLetter = this.dealWithLetter(this.lastSpin);
				if (didFindLetter) {
					this.transitionTo("CHECK_PHRASE");
				} else {
					this.transitionTo("CHECK_FUNDS");
				}
				break;
			case "CHECK_VOWEL":
				if (this.letterToCheck < 0) {
					throw "Game is in invalid state";
				}
				this.currentWordFunds -= 250;
				if (this.currentWordFunds < 0) {
					// Overdraft
					this.savedFunds += this.currentWordFunds;
					this.currentWordFunds = 0;
				}
				var didFindLetter = this.dealWithLetter(0);
				if (didFindLetter) {
					this.transitionTo("CHECK_PHRASE");
				} else {
					this.transitionTo("CHECK_FUNDS");
				}
				break;
			case "CHECK_PHRASE":
				var currentPhrase = this.currentPhrase.join(" ");
				var displayPhrase = this.displayPhrase.join(" ");
				if (currentPhrase == displayPhrase) {
					this.savedFunds += this.currentWordFunds;
					this.currentWordFunds = 0;
					alert("Good job!");
					var completedWord = document.createElement("h3");
					completedWord.innerHTML = this.currentPhrase.join(" ");
					document.getElementById("scoreboard").appendChild(completedWord);
					this.transitionTo("NEW_WORD");
				} else {
					this.transitionTo("CHECK_FUNDS");
				}
				break;
			default:
				throw "Game is in invalid state";
				break;
		}
	};

	this.handle = function(event) {
		switch (this.state) {
			case "CHOOSE_CONSONANT":
				if (65 <= event.keyCode && event.keyCode <= 90) {
					var char = event.keyCode - 65;
					switch (char) {
						case 0:
						case 4:
						case 8:
						case 14:
						case 20:
							break;
						default:
							if (!this.guessedLetters[char]) {
								this.guessedLetters[char] = true;
								this.letterToCheck = char;
								this.transitionTo("CHECK_CONSONANT");
							}
							break;
					}
				}
				break;
			default:
				break;
		}
	};
};
