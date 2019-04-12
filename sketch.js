

let playerMoves = [];
let playerNumericMoves = [];
let playerCenterMouse = [];
let grid = [];
let posiblePlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];


let numericPositions = {
  1: [50, 50],
  2: [150, 50],
  3: [250, 50],
  4: [50, 150],
  5: [150, 150],
  6: [250, 150],
  7: [50, 250],
  8: [150, 250],
  9: [250, 250]
}


let danger = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
  [9, 5, 1]
]
// lista de situaciones peligrosas a las que tiene que reaccionar defender.



let PC;
let mainLoop;
let pcFlower;
let playerFlower;

function preload() {
  pcFlower = loadImage('cutie.png');
  playerFlower = loadImage('dalila.png');
}

function setup() {
  createCanvas(400, 400);
  for (let i = 50; i <= 300; i += 100) {
    for (let j = 50; j <= 300; j += 100) {
      grid.push(new Cell(j, i, 100));
    }
  }
  PC = new Defender();
  mainLoop = true;
}

function draw() {
  if (mainLoop) {

    background(240, 150, 200);
    //image(kitten, 0, 0, width+100, height);

    // grid
    for (let cell of grid) {
      cell.draw();
    }
    for (let moves of playerCenterMouse) {
      fill(0);
      imageMode(CENTER);
      image(playerFlower, moves[0], moves[1], 100, 100);
    }
    if (posiblePlaces.length !== 0) {
      if (playerMoves.length > PC.moves.length) {
        let blocked = PC.choseBestMove(numericPositions, posiblePlaces, danger, playerNumericMoves);
        for (let warning of danger) {
          if (blocked[0] === warning[0] && blocked[1] === warning[1] && blocked[2] === warning[2]) {
            let index = danger.indexOf(warning);
            danger.splice(index, 1)
          }
        }
        for (let spaces of posiblePlaces) {
          for (let moves of PC.moves) {
            for (let key of Object.keys(numericPositions)) {
              if (numericPositions[key][0] === moves[0] && numericPositions[key][1] === moves[1]) {
                if (key == spaces) {
                  let index = posiblePlaces.indexOf(parseInt(key));
                  posiblePlaces.splice(index, 1);
                  // note: parseInt to key because key object is not an int.
                }
              }
            }
          }
        }
      }
    }

    PC.show(pcFlower);
  }
  let win = Win(danger, playerNumericMoves, PC.numericMoves);
  if (win[0] === true || posiblePlaces.length == 0) {
    mainLoop = false;
    textSize(28);
    fill(255, 180, 230, 10);
    stroke('rgba(255, 100)');
    rect(0, 175, width, 60);
    fill(255, 40);
    textAlign(CENTER);
    textStyle(NORMAL);
    noStroke();
    if (win[1] !== 'none') {
      text(win[1] + ' wins', 200, 210);
    } else {
      text('Tie', 200, 210);
    }
    textSize(15);
    text('Press any key to play again', 200, 225)
    if (keyIsPressed) {
      mainLoop = true;
      playerMoves = [];
      playerNumericMoves = [];
      playerCenterMouse = [];
      posiblePlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      PC.moves = [];
      PC.numericMoves = [];
      danger = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
        [9, 5, 1]
      ]
    }
  }
}

function mousePressed() {

  for (let cell of grid) {
    if (cell.insideCell(mouseX, mouseY)) {
      playerCenterMouse.push(cell.center);
      // pushes the center because circles need center positions to draw them as opose with rects.
      playerMoves.push([cell.x, cell.y]);

      // this compares the objects of positions and pushes the numeric value of the cell the player has placed its move. For instance, it pushes whole numbers like 4, 5, 6 into an array.
      for (let key of Object.keys(numericPositions)) {
        if (numericPositions[key][0] === cell.x && numericPositions[key][1] === cell.y) {
          let index = posiblePlaces.indexOf(parseInt(key));
          playerNumericMoves.push(parseInt(key));
          posiblePlaces.splice(index, 1);
        }
      }

    }
  }
}

function Win(danger, playermoves, pcmoves) {
  // 3 arrays
  let player = 0;
  let pc = 0;
  for (let play of danger) {
    for (let i = 0; i < 3; i++) {
      if (playermoves.includes(play[i])) {
        player++;
      }
      if (pcmoves.includes(play[i])) {
        pc++;
      }
      if (player > 2) {
        return [true, 'PLAYER'];
      }
      if (pc > 2) {
        return [true, 'PC'];
      }
    }
    pc = 0;
    player = 0;
  }
  return [false, 'none'];
}