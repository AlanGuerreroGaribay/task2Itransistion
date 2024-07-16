export class Game {
  movesList = null;

  constructor(movesList) {
    this.movesList = movesList;
  }

  //validate the list of moves availables
  movesAllowedValidation() {
    const uniqueNumbers = [];

    if (this.movesList.length < 3) {
      return { validation: false, msg: "You need to add 3 moves minimum!" };
    }
    if (this.movesList.length % 2 === 0) {
      return {
        validation: false,
        msg: "The number of moves allowed must be an odd amount",
      };
    }

    for (let i = 0; i < this.movesList.length; i++) {
      if (!uniqueNumbers.includes(this.movesList[i])) {
        uniqueNumbers.push(this.movesList[i]);
      }
    }

    if (uniqueNumbers.length !== this.movesList.length) {
      return {
        validation: false,
        msg: "There are repeated moves in the list of allowed moves",
      };
    }

    return { validation: true, msg: "Rules set!" };
  }

  showMovesAvailables() {
    console.log("List of allowed moves: ");
    this.movesList.map((move, i) => {
      console.log(`${i + 1}) ${move}`);
    });
    console.log("0) exit");
    console.log("h) help");
  }
}
