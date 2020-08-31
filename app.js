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
	overlay = document.getElementById('overlay');
	overlay.style.display = 'none';
});

function getRandPhraseAsArray (arr) {
	// Get random phrase and store it as an array
	randPhrase = Math.floor(Math.random() * arr.length);
	chars = [];
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
		letters = document.getElementsByClassName('letter');
		match = null;
		for (let i = 0; i < letters.length; i++) {
			if (button.textContent.toLowerCase() == letters[i].textContent.toLowerCase()) {
				letters[i].className = 'show';
				match += button.textContent;
			}
		}
		return match;
	}

	if (button.tagName === 'BUTTON' && button.className !== 'chosen') {
		button.className = 'chosen';
		letterFound = checkLetter(button);
		if (letterFound === null) {
			for (let i = 0; i < hearts.length; i++) {
				heartTotal.removeChild(hearts[i]);
				return (missed += 1);
			}
		}
	}
});
