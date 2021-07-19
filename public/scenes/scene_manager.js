const SceneManager = {
    currScene: "walking",
    currScene_index: 0,
    sceneOptions: ["walking", "talking", "battle"],
    sceneLoaded: 0,


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