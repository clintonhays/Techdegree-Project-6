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

// reset.addEventListener('click', (e) => {
// 	e = event.target;
// 	overlay = document.getElementById('overlay');
// 	overlay.style.display = 'none';
// });
