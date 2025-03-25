// Function to play the music when the page loads
function playMusic() {
    console.log("Hello")
    const audio = document.getElementById('gameAudio'); // Access the audio element
    audio.play();  // Play the audio
}

// Call the function to play music when the page loads
window.onload = playMusic;
