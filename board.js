var board;
var id = 0;

class Board {
  constructor(row, col, w) {
    this.rows = row;
    this.cols = col;
    this.tileWidth = w;
    this.board = [];
    this.selectedTile = null;
    
    for (var j = 0; j < this.rows; j++) {
      this.board[j] = [];
    }
    
    for (var i = 0; i < (rows * cols) / 2; i++) {
      var r = random(5, 255);
      var g = random(5, 255);
      var b = random(5, 255);
      this.placeTile(r, g, b);
      this.placeTile(r, g, b);
      id++;
    }
  }
  
  placeTile(r, g, b) {
    var row, col;
    
    do {
      row = Math.floor(Math.random() * this.rows);
      col = Math.floor(Math.random() * this.cols);
    } while (this.board[row][col] != null);
    
    this.board[row][col] = new Tile([r, g, b], row, col, id);
  }
  
  getTile(r, c) {
    return this.board[r][c];
  }
  
  tileClicked(x, y) {
    this.deselectAll();
    var row = Math.floor(y / this.tileWidth);
    var col = Math.floor(x / this.tileWidth);
    //console.log(row + ", " + col);
    
    if (row < this.rows && row >= 0 && 
        col < this.cols && col >= 0) {
      if (this.board[row][col] == null) {
        this.selectedTile = null;
        return false;
      }
      if (this.selectedTile != null && 
          this.board[row][col] != this.selectedTile &&
          this.board[row][col].getId() == this.selectedTile.getId()) {
        this.board[row][col] = null;
        this.board[this.selectedTile.getRow()][this.selectedTile.getCol()] = null;
        return true;
      } else {
        this.board[row][col].select();
        this.selectedTile = this.board[row][col];
        return false;
      }
    } else {
      this.selectedTile = null;
      return false;
    }
  }
  
  deselectAll() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.board[i][j] != null) {
          this.board[i][j].deselect();
        }
      }
    }
  }
  
  isGameOver() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.board[i][j] != null) {
          return false;
        }
      }
    }
    return true;
  }
}

class Tile {
  constructor(image, r, c, id) {
    this.image = image;
    this.row = r;
    this.col = c;
    this.id = id;
    this.highlight = false;
  }
  
  getImage() {
    return this.image;
  }
  
  getId() {
    return this.id;
  }
  
  getRow() {
    return this.row;
  }
  
  getCol() {
    return this.col;
  }
  
  select() {
    this.highlight = true;
  }
  
  deselect() {
    this.highlight = false;
  }
}