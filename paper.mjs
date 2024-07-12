import readline from "readline";

//validate the list of moves availables
const movesAllowedValidation = (moves) => {
  const uniqueNumbers = [];

  if (moves.length < 3) {
    return { validation: false, msg: "You need to add 3 moves minimum!" };
  }
  if (moves.length % 2 === 0) {
    return {
      validation: false,
      msg: "The number of moves allowed must be an odd amount",
    };
  }

  for (let i = 0; i < moves.length; i++) {
    if (!uniqueNumbers.includes(moves[i])) {
      uniqueNumbers.push(moves[i]);
    }
  }

  if (uniqueNumbers.length !== moves.length) {
    return {
      validation: false,
      msg: "There are repeated moves in the list of allowed moves",
    };
  }

  return { validation: true, msg: "" };
};

//establishes the winning codition and picks a winner acording the given data
const selectWinner = (userMove, computerMove, movesList) => {
  const userMoveIndex = movesList.indexOf(userMove);
  const computerMoveIndex = movesList.indexOf(computerMove);
  const mediumPoint = Math.floor(movesList.length / 2);

  const result = Math.sign(
    ((userMoveIndex - computerMoveIndex + mediumPoint + movesList.length) %
      movesList.length) -
      mediumPoint
  );

  if (result === 0) {
    return "it is a tie!";
  }

  if (result === -1) {
    return `Computer: ${computerMove} \n User: ${userMove} \n Computer wins!`;
  } else {
    return `Computer: ${computerMove} \n User: ${userMove} \n You win!`;
  }
};

const main = () => {
  //stablish de allowed moves
  const movesList = process.argv;
  movesList.splice(0, 2);

  //validate the allowed moves
  const movesAllowed = movesAllowedValidation(movesList);
  if (!movesAllowed.validation) {
    console.error(movesAllowed.msg);
    return movesAllowed;
  }

  console.log("List of allowed moves: ");
  movesList.map((move, i) => {
    console.log(`${i + 1}) ${move}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //provide an user move to compare with the computer move selection
  rl.question("Select a move from de list above: ", (userMove) => {
    //validate the move picked
    if (!movesList.includes(userMove)) {
      console.log("move not allowed");
    } else {
      //the computer selects a random number
      const computerMove =
        movesList[Math.floor(Math.random() * movesList.length)];

      const winner = selectWinner(userMove, computerMove, movesList);
      console.log(winner);
    }

    rl.close();
  });
};

main();
