const AudioManager = {
    AudioMap: AUDIOS,
    Init: function () {
        const keys = Object.keys(this.AudioMap);
        let audioPath = "";
        keys.forEach((key) => {
            audioPath = this.AudioMap[key].path;
            this.AudioMap[key].audio = new Audio(audioPath);
        });
    },
    Play: function (audioId) {
        const currentAudio = this.AudioMap[audioId];
        currentAudio.audio.volume = currentAudio.volume;
        currentAudio.audio.loop = currentAudio.loop;
        currentAudio.audio.play();
    },
    Stop: function () {
        const currentAudio = this.AudioMap[audioId];
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
};

export { AudioManager };