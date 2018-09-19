class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w; 
        this.y = j * w;
        this.w = w;
        this.neighborCount = 0;
        this.bee = false;
        this.revealed = false;
        this.flagged = false;
    }

    show() {
    	stroke(0);
        noFill();
    	let half_w = this.w/2;
    	rect(this.x, this.y, this.w, this.w);
    	if (this.revealed) {
    		if (this.bee) {
    			fill(127);
    			ellipse(this.x + half_w, this.y + half_w, half_w);
    		} else {
    			fill(200);
    			rect(this.x, this.y , this.w, this.w);
    			if (this.neighborCount > 0) {
    				textAlign(CENTER);
    				fill(0);
    				text(this.neighborCount, this.x + half_w, this.y + this.w * 0.75);
    			}
    		}
    	} else if (!this.revealed && this.flagged) {
    	    textAlign(CENTER);
    	    fill(0);
    		text("X", this.x + half_w, this.y + this.w * 0.75);
    	}
    }

    countBees() {
    	var total = 0;
    	if (this.bee) {
    		this.neighborCount = -1;
    		return;
    	}
    	for (var xoff = -1; xoff <= 1; xoff++) {
    		for (var yoff = -1; yoff <= 1; yoff++) {
    			var i = this.i + xoff;
    			var j = this.j + yoff;
    			if (i > -1 && i < activeGame.cols && j > -1 && j < activeGame.rows) {
    				var neighbor = activeGame.grid[i][j];
    			  if (neighbor.bee) {
    				  total++;
    			  }
    			}
    		}
    	}
    	this.neighborCount = total;
    }
		
    contains(x, y) {
    	return (x > this.x && x < this.x + this.w && y > this.y && y< this.y + this.w);
    }

    reveal() {
    	this.revealed = true;
    	if (this.neighborCount == 0) {
    		this.floodFill();
    	}
    }
	
    floodFill() {
    	for (var xoff = -1; xoff <= 1; xoff++) {
    		for (var yoff = -1; yoff <= 1; yoff++) {
    			var i = this.i + xoff;
    			var j = this.j + yoff;
    			if (i > -1 && i < activeGame.cols && j > -1 && j < activeGame.rows) {
    				var neighbor = activeGame.grid[i][j];
    			  if (!neighbor.bee && !neighbor.revealed) {
    				  neighbor.reveal();
    			  }
    			}
    		}
    	}
    }

    toggleFlag() {
        if (!this.flagged) {
            this.flagged = true;
            activeGame.totalFlags--;
        } else {
            this.flagged = false;
            activeGame.totalFlags++;
        }
    }
}