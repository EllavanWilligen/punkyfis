const audioToPlay = document.getElementById("audioFile");
const playButton = document.getElementById("playButton");
const silentButton = document.getElementById("silentButton");

silentButton.addEventListener("click", () => {
    audioToPlay.pause();
    audioToPlay.muted = true;
    document.body.classList.remove("is-locked");
});

playButton.addEventListener("click", async () => {
    playButton.disabled = true;
    playStatus.textContent = "";

    try {
        audioToPlay.muted = false;
        await audioToPlay.play();
        document.body.classList.remove("is-locked");
    } catch (error) {
        console.error("Audio playback failed:", error);
        playButton.disabled = false;
    }
});