const overlay = document.getElementById('overlay');
const guess = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const reset = document.getElementsByClassName('btn__reset')[0];
let missed = 0;

const phrases = [
	'Shantay you stay',
	'Now sashay away',
	'Reading is fundamental',
	'She done already done had herses',
	'Can I get an amen',
	'Oh no she better dont'
];

reset.addEventListener('click', (e) => {
	overlay.style.display = 'none';
});

function getRandPhraseAsArray (arr) {
	// Get random phrase and store it as an array
	const randPhrase = Math.floor(Math.random() * arr.length);
	let chars = [];
	for (let i = 0; i < arr[randPhrase].length; i++) {
		chars.push(arr[randPhrase][i]);
	}
	return chars;
}

const phraseArray = getRandPhraseAsArray(phrases);

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

addPhraseToDisplay(phraseArray);

qwerty.addEventListener('click', (e) => {
	const button = e.target;
	const hearts = document.getElementsByClassName('tries');
	const heartTotal = document.getElementById('scoreboard').firstElementChild;

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
			for (let i = 0; i < hearts.length; i++) {
				button.style.backgroundColor = '#FF70A6';
				heartTotal.removeChild(hearts[i]);
				break;
			}
			missed++;
		}
	}
	checkWin();
});

function checkWin () {
	const letters = document.getElementsByClassName('letter').length;
	const shown = document.getElementsByClassName('show');
	if (letters === shown.length) {
		setTimeout(() => {
			overlay.className = 'win';
			overlay.firstElementChild.textContent = 'You Win!';
			overlay.style.display = 'flex';
		}, 2000);
	}
	else if (missed >= 5) {
		setTimeout(() => {
			overlay.className = 'lose';
			overlay.firstElementChild.textContent = 'You Lose!';
			overlay.style.display = 'flex';
		}, 200);
	}
}
