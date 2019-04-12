class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moves = [];
    this.numericMoves = [];
  }
  choseBestMove(numericPos, possiblemoves, attacks, playermoves) {
    // analizes posibilities and choses the best cell to move
    if (this.moves.length === 0) {
      if (playermoves[0] !== 5 ) {
        this.moves.push([150, 150]);
        this.numericMoves.push(5);
        return [0, 0, 0];
      } else {
        let position;
        let move = random(possiblemoves);
        this.numericMoves.push(move);
        this.moves.push(numericPos[move]);
        return [0, 0, 0];
          // returns the positions of the attacks blocked and the position of the NO, USE THIS WITH THE THIS.MOVES IN THE MAIN LOOP. / already implemented this./keeping the comment because I love time traveling with my messages.
      }
    }
    let win = this.checkWin(attacks, possiblemoves, numericPos);
    if (win) {
      return [0, 0, 0];
    }
    
    let nextMove = [];
    let temporal = [];
    let alarmingMove = 0;

    for (let alert of attacks) {
      for (let i = 0; i < playermoves.length; i++) {
        if (playermoves[i] === alert[0] || playermoves[i] === alert[1] || playermoves[i] === alert[2]) {
            alarmingMove++;
        }
        if (alarmingMove > 1) {
          let newPos = diff(alert, playermoves);
          if (possiblemoves.includes(newPos)) {
            this.moves.push(numericPos[newPos]);
            this.numericMoves.push(newPos);
            return alert;
          }
        }
      }
      alarmingMove = 0;
    }

    // el programa se traba cuando encuentra jugadas de ataque repetidas. Probablemente deba sacar la jugada de la lista cada vez que es bloqueada./ DONE
  let move = random(possiblemoves);
  this.moves.push(numericPos[move]);
  this.numericMoves.push(move);
  return move;
  }



  show(img) {
    // takes an array as argument
    for (let move of this.moves) {
      image(img, move[0]+50, move[1]+50, 100, 100);
    }
  }

  checkWin(attacks, possiblemoves, numericPos) {
    // analizes if it can win in the next move or not. Proceeds to move if the win is secured.
    let alarmingMove = 0;
    for (let alert of attacks) {
      for (let i = 0; i < this.numericMoves.length; i++) {
        if (this.numericMoves[i] === alert[0] || this.numericMoves[i] === alert[1] || this.numericMoves[i] === alert[2]) {
            alarmingMove++;
        }
        if (alarmingMove > 1) {
          let newPos = diff(alert, this.numericMoves);
          if (possiblemoves.includes(newPos)) {
            this.moves.push(numericPos[newPos]);
            this.numericMoves.push(newPos);
            return true;
          }
        }
      }
      alarmingMove = 0;
    }
    return false;
  }
}
function diff(danger, moves) {

  for (let x of danger) {
    if (moves.indexOf(x) === -1) {
      return x;
    }
  }
  
  
  
  
}