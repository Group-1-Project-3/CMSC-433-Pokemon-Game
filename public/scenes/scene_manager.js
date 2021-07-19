
const SceneManager = {
    currScene : "walking",
    sceneOptions : ["walking", "battle"],

    setScene : function(newScene) {
        this.currScene = newScene;
    },

    getScene : function(){
        return this.currScene;
    }

};

export { SceneManager };
