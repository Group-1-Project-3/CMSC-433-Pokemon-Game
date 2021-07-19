const SceneManager = {
    currScene: "choosingStarter",
    currScene_index: 4,
    sceneOptions: ["walking", "talking", "battle", "swapping", "choosingStarter", "catching"],
    sceneLoaded: 0,
    chosenStarter: 0,
    finishedChoosing: 0,
    finishedSwapping: 0,
    caughtPokemon: 0,

    nextScene: function () {
        this.currScene_index += 1;

        if (this.currScene_index == this.sceneOptions.length) {
            this.currScene_index = 0;
        }

        this.currScene = this.sceneOptions[this.currScene_index];
    },

    getScene: function () {
        return this.currScene;
    },

    toggleBattleSceneLoaded: function () {
        this.sceneLoaded = (this.sceneLoaded) ? 0 : 1;
    },

    checkBattleSceneLoaded: function () {
        return this.sceneLoaded;
    }


};

export { SceneManager };
