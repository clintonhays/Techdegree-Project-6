//
// - - - - - Global Variables - - - - -
//

const overlay = document.getElementById('overlay');
const startGame = document.getElementsByClassName('btn__reset')[0];
const keys = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const hearts = document.getElementsByClassName('tries');
const heartTotal = document.getElementById('scoreboard').firstElementChild;
let missed = 0;

const phrases = [
	'Shantay you stay',
	'May the best lady win',
	'Reading is fundamental',
	'She done already done had herses',
	'Can I get an amen',
	'Oh no she better dont'
];

const phraseArray = getRandPhraseAsArray(phrases);

//
// - - - - - End Global Variables - - - - -
//

//
// - - - - - Global Functions - - - - -
//

// get random phrase from [phrases] and return an
// array of the characters from the phrase
function getRandPhraseAsArray (arr) {
	const random = Math.floor(Math.random() * arr.length);
	let chars = [];
	for (let i = 0; i < arr[random].length; i++) {
		chars.push(arr[random][i]);
	}
	return chars;
}

function addPhraseToDisplay (arr) {
	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		li.textContent = arr[i];
		phrase.append(li);
		if (li.textContent !== ' ') {
			li.className = 'letter';
		}
		else {
			li.className = 'space';
		}
	}
}

// How to refactor this code?
function checkWin () {
	const letters = document.getElementsByClassName('letter').length;
	const shown = document.getElementsByClassName('show');
	const subtitle = document.getElementsByClassName('subtitle')[0];
	if (letters === shown.length) {
		setTimeout(() => {
			overlay.className = 'win';
			overlay.firstElementChild.textContent = 'Condragulations!';
			overlay.style.display = 'flex';
			startGame.textContent = 'One more time';
			subtitle.textContent = " You're a winner, baby!";
		}, 2000);
	}
	else if (missed >= 5) {
		setTimeout(() => {
			overlay.className = 'lose';
			overlay.firstElementChild.textContent = 'Sashay away...';
			overlay.style.display = 'flex';
			startGame.textContent = 'One more time';
			subtitle.textContent = `Answer: ${phraseArray.join('')}`;
		}, 200);
	}
}

//
// - - - - - End Global Functions - - - - -
//

//
// - - - - - Initialize Game - - - - -
//

// button click sets initial overlay display to none
startGame.addEventListener('click', (e) => {
	overlay.style.display = 'none';
});

addPhraseToDisplay(phraseArray);

qwerty.addEventListener('click', (e) => {
	const button = e.target;

	function checkLetter (button) {
		const letters = document.getElementsByClassName('letter');
		let match = null;
		for (let i = 0; i < letters.length; i++) {
			if (button.textContent.toLowerCase() === letters[i].textContent.toLowerCase()) {
				// letters[i].className = 'show'; // This line does not add class name to consecutive repeated letters. Why?
				letters[i].classList.add('show');
				button.style.backgroundColor = '#6DB0C5';
				match += button.textContent;
			}
		}
		return match;
	}

	if (button.tagName === 'BUTTON' && button.className !== 'chosen') {
		button.className = 'chosen';
		const letterFound = checkLetter(button);
		if (letterFound === null) {
			button.style.backgroundColor = '#FF70A6';
			for (let i = 0; i < hearts.length; i++) {
				heartTotal.removeChild(hearts[i]);
				break;
			}
			missed++;
		}
	}
	checkWin();
});
