/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {

  let board = new Board({n: n});
  let remainingPieces = n;
  var row = 0;
  var column = 0;
  board.togglePiece(row, column);
  remainingPieces--;


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

    board.togglePiece(row, column);
    if (!board.hasAnyRooksConflicts()) {
      remainingPieces--;
    } else {
      board.togglePiece(row, column);
    }
  }
  var solution = board.rows();
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
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
  var solutionCount = 0;

  let board = new Board({n: n});

  let solutionCounter = function(row = 0) {
    if (row >= n) {
      solutionCount++;
      return;
    }

    for (let column = 0; column < n; column++) {
      board.togglePiece(row, column);
      if (!board.hasAnyQueensConflicts()) {
        solutionCounter(row + 1);
      }
      board.togglePiece(row, column);
    }
  };
  solutionCounter();

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
