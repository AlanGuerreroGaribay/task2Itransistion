import readline from "readline";
import { Encoder } from "./classes/encoder.mjs";
import { Rules } from "./classes/rules.mjs";
import { Game } from "./classes/game.mjs";
import { Help } from "./classes/help.mjs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  const movesList = process.argv;
  movesList.splice(0, 2);

  const computerMove = movesList[Math.floor(Math.random() * movesList.length)];
  const newGame = new Game(movesList);
  const ruleSet = new Rules(movesList);
  const helpTable = new Help(movesList);
  const computerHmac = new Encoder(computerMove);

  //console app function
  function selectValue() {
    rl.question("Select your move: ", (userMove) => {
      if (userMove === "h") {
        helpTable.showTable();
        selectValue();
      } else if (userMove === "0") {
        console.log("You choose to exit. Good bye!");
        rl.close();
      } else if (!movesList.includes(userMove)) {
        console.log("The option selected is no valid, pick another move!");
        selectValue();
      } else {
        const userHmac = new Encoder(userMove);
        const result = ruleSet.selectWinner(userMove, computerMove, movesList);
        const scretKey = `HMAC key: ${userHmac.getHMAC()}`;

        console.log(scretKey);
        console.log(result);
        rl.close();
      }
    });
  }

  //list moves validation
  const validation = newGame.movesAllowedValidation();
  if (!validation.validation) {
    console.log(validation.msg);
    return;
  }

  //Displays the HMAC according the computer move selection
  console.log("HMAC:", computerHmac.getHMAC());

  //Displays the moves availables for the user
  newGame.showMovesAvailables();

  //executes the game
  selectValue();
}

main();
