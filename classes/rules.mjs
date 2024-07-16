export class Rules {
  moves = undefined;

  constructor(moves) {
    this.moves = moves;
  }

  //establishes the winning codition and picks a winner acording the given data
  selectWinner(userMove, computerMove) {
    const userMoveIndex = this.moves.indexOf(userMove);
    const computerMoveIndex = this.moves.indexOf(computerMove);
    const mediumPoint = Math.floor(this.moves.length / 2);

    const result = Math.sign(
      ((userMoveIndex - computerMoveIndex + mediumPoint + this.moves.length) %
        this.moves.length) -
        mediumPoint
    );

    if (result === 0) {
      return ` --Results-- \n Your move: ${userMove} \n Computer's move: ${computerMove} \n It is a tie!`;
    }
    if (result === -1) {
      return ` --Results-- \n Your move: ${userMove} \n Computer's move: ${computerMove} \n Computer wins!`;
    } else {
      return ` --Results-- \n Your move: ${userMove} \n Computer's move: ${computerMove} \n You win!`;
    }
  }
}
