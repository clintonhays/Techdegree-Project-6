const guess = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const reset = document.getElementsByClassName('btn__reset')[0];
const missed = 0;

const phrases = [
	'shantay you stay',
	'now sashay away',
	'reading is fundamental',
	'she done already done had herses',
	'oh no she better dont'
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

getRandPhraseAsArray(phrases);
