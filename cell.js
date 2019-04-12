class Cell {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.width =r;
    this.center = [this.x + this.width / 2, this.y + this.width/2];
  }
  draw() {
    fill(255, 100);
    stroke('rgba(255, 10)')
    rect(this.x, this.y, 100, 100);
  }
  insideCell(x, y) {
    if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.width) {
      return true;
    }
    return false;
  }
}















