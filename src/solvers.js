/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

/* ================================================================================================

To use the Board() constructor, you must pass it an argument in one of the following formats:
1. An object. To create an empty board of size n:
		{n: <num>} - Where <num> is the dimension of the (empty) board you wish to instantiate
   EXAMPLE: var board = new Board({n:5})
2. An array of arrays (a matrix). To create a populated board of size n:
		[ [<val>,<val>,<val>...], [<val>,<val>,<val>...], [<val>,<val>,<val>...] ] - Where each <val> is whatever value you want at that location on the board
   EXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])


board.get(n) will return the 'n' index row array of the board (assuming that instance exists)
board.set(key, value) will create a new key/value pair in the board object.
 Key should be the row index number and the value should be a row array


togglePiece: function(rowIndex, colIndex) --> changes a 0 to a 1 or a 1 to a 0

var matrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

===============================================================================================*/

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  //var solution = 0; //fixme
  let board = new Board({n: n});
  //console.log('board.row', board.rows());
  let remainingPieces = n;
  var row = 0;
  var column = 0;
  board.togglePiece(row, column);
  remainingPieces--;

  // [0 0]
  // [1 0]
  while (remainingPieces > 0) {
    if (column >= n - 1 && row < n - 1) {
      column = 0;
      row ++;
    } else if (column < n - 1) {
      column ++;
    } else if (row === n - 1 && column === n - 1) {
      row = 0;
      column = 0;
    }
    // add a piece to the board
    board.togglePiece(row, column);
    // check if there is any collisisons
    if (!board.hasAnyRooksConflicts()) {
      remainingPieces--;
    } else {
      board.togglePiece(row, column);
    }
  }
  var solution = board.rows();
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
  // // debugger;
  // var solutionCount = 0; //fixme
  // // have a starting row and column of value 0 (starting on the top left corner of board)
  // let row = 0;
  // let col = 0;
  // let solutionsStorageArray = [];
  // // Iterate through every square on the board invoking findNRooksSolution(n, row, column)

  // if (n === 1) {
  //   return 1;
  // }
  // while (row <= n - 1) {
  //   // if (solutionCount > 10) {
  //   //   break;
  //   // }
  //   //console.log('SOLUTION COUNT', solutionCount);
  //   // debugger;
  //   let solution = findNRooksSolution(n, row, col);
  //   let stringifiedSolution = JSON.stringify(solution);
  //   //console.log(findNRooksSolution(n, row, col));
  //   if (!solutionsStorageArray.includes(stringifiedSolution)) {
  //     solutionsStorageArray.push(stringifiedSolution);
  //     solutionCount++;
  //     console.log('SOLUTION', solution);
  //   }

  //   if (col >= n - 1 && row === n - 1) {
  //     break;
  //   }
  //   if (col === n - 1 && row !== n - 1) {
  //     col = 0;
  //     row++;
  //   } else if (col < n - 1) {
  //     col++;
  //   }
  // }
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;

  var solutionCount = 0;

  let board = new Board({n: n});

  let solutionCounter = function(row = 0) {

    if (row >= n) {
      solutionCount++;
      return;
    }

    for (let column = 0; column < n; column++) {
      board.togglePiece(row, column);

      if (!board.hasAnyRooksConflicts()) {
        solutionCounter(row + 1);
      }

      board.togglePiece(row, column);
    }

  };

  solutionCounter();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  let board = new Board({n: n});
  let solution = board.rows();

  let solutionFinder = function(row = 0) {

    if (row >= n) {
      solution = board.rows().map(row => {
        return row.slice();
      });
      return;
    }

    for (let column = 0; column < n; column++) {
      board.togglePiece(row, column);

      if (!board.hasAnyQueensConflicts()) {
        solutionFinder(row + 1);
      }

      board.togglePiece(row, column);
    }
  };
  solutionFinder();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
