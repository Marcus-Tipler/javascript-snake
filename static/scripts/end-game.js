const startGameBtn = document.getElementById('startGameBtn');
const gameAudio = document.getElementById('gameAudio');

// Trigger the sound on button click
startGameBtn.addEventListener('click', () => {
    gameAudio.play();  // Play sound when the user clicks "Start Game"
});

document.getElementById('restartButton').addEventListener('click', function() {
    window.location.href = 'snake'; // Redirect to the game page
});

document.getElementById('goToMenu').addEventListener('click', function() {
    window.location.href = '/'; // Redirect to the game page
});
