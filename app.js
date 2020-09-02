//										//
// - - - - - Global Variables - - - - - //
//										//

const overlay = document.getElementById('overlay');
const startGame = document.getElementsByClassName('btn__start')[0];
const phrase = document.getElementById('phrase');
const phraseUl = phrase.firstElementChild;
const keyrows = document.getElementById('qwerty');
const keys = document.getElementsByTagName('button');
const heartTotal = document.getElementById('scoreboard').firstElementChild;
const hearts = document.getElementsByClassName('tries');
let missed = 0;
const removedHearts = [];
const restartGame = document.getElementsByClassName('btn__reset')[0];

const phrases = [
	'Shantay you stay',
	'May the best woman win',
	'Reading is fundamental',
	'She done already done had herses',
	'Can I get an amen',
	'Oh no she bettah dont'
];

let phraseArray = getRandPhraseAsArray(phrases);

//											//
// - - - - - End Global Variables - - - - - //
//											//

//										//
// - - - - - Global Functions - - - - - //
//										//

// get random phrase from [phrases] and return an array of the characters from the phrase //
function getRandPhraseAsArray (arr) {
	const random = Math.floor(Math.random() * arr.length);
	let chars = [];
	for (let i = 0; i < arr[random].length; i++) {
		chars.push(arr[random][i]);
	}
	return chars;
}

// add random phrase to display //
function addPhraseToDisplay (arr) {
	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		li.textContent = arr[i];
		phraseUl.append(li);
		if (li.textContent !== ' ') {
			li.className = 'letter';
		}
		else {
			li.className = 'space';
		}
	}
}

// check target text content agianst phraseArray indices //
function checkLetter (target) {
	const letters = document.getElementsByClassName('letter');
	let match = null;
	for (let i = 0; i < letters.length; i++) {
		if (target.textContent.toLowerCase() === letters[i].textContent.toLowerCase()) {
			letters[i].classList.add('show');
			target.style.backgroundColor = '#6DB0C5';
			match += target.textContent;
		}
	}
	if (target.tagName === 'BUTTON' && target.className !== 'chosen') {
		target.className = 'chosen';
		const letterFound = checkLetter(target);
		if (letterFound === null) {
			target.style.backgroundColor = '#FF70A6';
			for (let i = 0; i < hearts.length; i++) {
				removedHearts.push(heartTotal.removeChild(hearts[i]));
				break;
			}
			missed++;
		}
	}
	return match;
}

// checks win condition by comparing shown letters to the length of the phrase array //
// checks loss condition by comparing # of missed guesses to length of <ol> //
function checkWin () {
	const letters = document.getElementsByClassName('letter').length;
	const shown = document.getElementsByClassName('show');
	const subtitle = document.getElementsByClassName('subtitle')[0];
	const endScreen = {
		base : () => {
			overlay.style.display = 'flex';
			restartGame.style.display = 'inline';
			restartGame.textContent = 'One more time';
			startGame.textContent = 'Quit';
			startGame.setAttribute('href', 'index.html');
		},
		win  : () => {
			overlay.className = 'win';
			overlay.firstElementChild.textContent = 'Condragulations!';
			subtitle.textContent = "You're a winner, baby!";
		},
		lose : () => {
			overlay.className = 'lose';
			overlay.firstElementChild.textContent = 'Sashay away...';
			subtitle.textContent = `Answer: ${phraseArray.join('')}`;
		}
	};

	if (letters === shown.length) {
		setTimeout(() => {
			endScreen.base();
			endScreen.win();
		}, 1800);
	}
	else if (missed >= 5) {
		setTimeout(() => {
			endScreen.base();
			endScreen.lose();
		}, 200);
	}
}

// resets hearts //
function resetHearts () {
	missed = 0;
	for (let i = 0; i < removedHearts.length; i++) {
		heartTotal.appendChild(removedHearts[i]);
	}
}

// resests chosen keys on keyboard //
function resetGuesses () {
	const chosen = document.querySelectorAll('.chosen');
	for (let i = 0; i < chosen.length; i++) {
		chosen[i].style.backgroundColor = '';
		chosen[i].className = '';
	}
}

// resets phrases //
function resetPhrase () {
	phraseUl.innerHTML = '';
	addPhraseToDisplay(getRandPhraseAsArray(phrases));
}

// resets game //
function resetGame () {
	resetPhrase();
	resetGuesses();
	resetHearts();
	overlay.style.display = 'none';
}

//											//
// - - - - - End Global Functions - - - - - //
//											//

//									   //
// - - - - - Initialize Game - - - - - //
//									   //

// button click sets initial overlay display to none //
startGame.addEventListener('click', (e) => {
	addPhraseToDisplay(phraseArray);
	overlay.style.display = 'none';
});

keyrows.addEventListener('click', (e) => {
	const button = e.target;
	checkLetter(button);
	checkWin();
});

// button click resets phrase, keys, and lives
restartGame.addEventListener('click', (e) => {
	resetGame();
});
