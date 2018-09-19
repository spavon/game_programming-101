class Game {
    constructor(width, height) {
        this.w = 20;
        this.cols = floor(width / this.w);
        this.rows = floor(height / this.w);
        this.grid = this.make2DArray();
        this.totalBees = 20;
        this.gameOver_status = false;
    }

    make2DArray() {
        var arr = new Array(this.cols);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.rows);
        }
        return arr;
    }

    gameOver() {
        this.gameOver_status = true;
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.grid[i][j].revealed = true;
            }
        }
    }
}