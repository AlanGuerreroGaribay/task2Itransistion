import { AsciiTable3, AlignmentEnum } from "ascii-table3";

export class Help {
  movesList = null;

  constructor(movesList) {
    this.movesList = movesList;
  }

  showTable() {
    const mediumPoint = Math.floor(this.movesList.length / 2);
    const results = [];

    for (let i = 0; i < this.movesList.length; i++) {
      const row = [this.movesList[i]];
      for (let j = 0; j < this.movesList.length; j++) {
        row.push(
          Math.sign(
            ((i - j + mediumPoint + this.movesList.length) %
              this.movesList.length) -
              mediumPoint
          )
        );
      }
      results.push(row);
    }

    for (let k = 0; k < results.length; k++) {
      for (let z = 0; z < results[k].length; z++) {
        if (results[k][z] === 0) {
          results[k][z] = "draw";
        } else if (results[k][z] === 1) {
          results[k][z] = "wins";
        } else if (results[k][z] === -1) {
          results[k][z] = "lose";
        }
      }
    }

    let table = new AsciiTable3("Player moves")
      .setHeading("", ...this.movesList)
      .setHeadingAlignLeft()
      .addRowMatrix(results)
      .setAlignCenter(3);

    console.log(table.toString());
  }
}
