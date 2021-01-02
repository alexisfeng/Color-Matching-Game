var board;
var rows = 8;
var cols = 10
var w = 40;
var x, y;
var score, time;

function setup() {
  createCanvas(700, 500);
  reset();
  x = (width / 2) - (cols / 2) * w;
  y = (height / 2) - (rows / 2) * w;
}

function draw() {
  background(0);

  if (!board.isGameOver()) {
    time++;
    textSize(30);
    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    text("Score: " + score, 20, 35);
    
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        tile = board.getTile(i, j);
        if (tile != null) {
          fill(tile.getImage()[0], tile.getImage()[1], tile.getImage()[2]);

        if (tile.highlight) {
          strokeWeight(3);
          stroke(255, 204, 0);
        } else {
          noStroke();
        }

        rect(x + j * w, y + i * w, w - 2, w - 2);
        }
      }
    }
  } else {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    noStroke();
    text("You won! Score: " + score, width / 2, height / 2);
    textSize(30);
    text("Click to play again", width / 2, height / 2 + 60);
  }
}

function mousePressed() {
  if (!board.isGameOver()) {
    var match = board.tileClicked(mouseX - x, mouseY - y);
    if (match) {
      score += Math.max(Math.floor(500 / Math.pow(1.05, time * 0.05)), 25);
      time = 0;
    }
  } else {
    reset();
  }
}

function reset() {
  board = new Board(rows, cols, w);
  score = 0;
  time = 0;
}