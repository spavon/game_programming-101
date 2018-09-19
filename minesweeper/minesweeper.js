document.oncontextmenu = function() {
    return false;
}

function setup() {
    createCanvas(201, 201);
    activeGame = new Game(width, height);
    // grid = activeGame.make2DArray();
    for (var i = 0; i < activeGame.cols; i++) {
        for (var j = 0; j < activeGame.rows; j++) {
            activeGame.grid[i][j] = new Cell(i, j, activeGame.w);
        }
    }
    
    // Pick totalBees spots
    var spots = [];
    for (var i = 0; i < activeGame.cols; i++) {
        for (var j = 0; j < activeGame.rows; j++) {
            spots.push([i, j]);
        }
    }
    
    for (var n = 0; n < activeGame.totalBees; n++) {
      var index = floor(random(spots.length));
        var spot = spots[index];
        var i = spot[0];
        var j = spot[1];
        spots.splice(index, 1);
        activeGame.grid[i][j].bee = true;
    }

    for (var i = 0; i < activeGame.cols; i++) {
        for (var j = 0; j < activeGame.rows; j++) {
            activeGame.grid[i][j].countBees();
        }
    }
}

function draw() {
  background(255);
        for (var i = 0; i < activeGame.cols; i++) {
        for (var j = 0; j < activeGame.rows; j++) {
            activeGame.grid[i][j].show();
        }
    }
}

function mousePressed() {
    if (!activeGame.gameOver_status) {
        for (var i = 0; i < activeGame.cols; i++) {
            for (var j = 0; j < activeGame.rows; j++) {
                if (activeGame.grid[i][j].contains(mouseX, mouseY) && (mouseButton == LEFT) && !activeGame.grid[i][j].flagged) {
                    activeGame.grid[i][j].reveal();
                            
                    if (activeGame.grid[i][j].bee) {
                        activeGame.gameOver();
                    }
                } else if (activeGame.grid[i][j].contains(mouseX, mouseY) && (mouseButton == RIGHT) && !activeGame.grid[i][j].revealed) {
                    activeGame.grid[i][j].toggleFlag();
                }
            }
        }
    } else {
        setup();
    }
}