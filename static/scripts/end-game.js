const startGameBtn = document.getElementById('startGameBtn');
const gameAudio = document.getElementById('gameAudio');

// Trigger the sound on button click
startGameBtn.addEventListener('click', () => {
    gameAudio.play();  // Play sound when the user clicks "Start Game"
});