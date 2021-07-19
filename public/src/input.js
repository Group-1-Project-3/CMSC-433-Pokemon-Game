const Events = {
    KEY: "",
    Init: function() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            const key = e.key;
            if (key === "ArrowUp" || key === "w")
                this.KEY = "UP";
            else if (key === "ArrowDown" || key === "s")
                this.KEY = "DOWN";
            else if (key === "ArrowRight" || key === "d")
                this.KEY = "RIGHT";
            else if (key === "ArrowLeft" || key === "a")
                this.KEY = "LEFT";
            else if (key === "j" || key === "z")
                this.KEY = "YES";
            else if (key === "k" || key === "x")
                this.KEY = "NO";
            else if (key === "u")
                this.KEY = "SELECTED";
        });
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            this.KEY="";
        });
    }
};

export { Events };
