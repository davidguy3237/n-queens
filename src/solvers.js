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

// To use the Board() constructor, you must pass it an argument in one of the following formats:
// 1. An object. To create an empty board of size n:
// 		{n: <num>} - Where <num> is the dimension of the (empty) board you wish to instantiate
//    EXAMPLE: var board = new Board({n:5})
// 2. An array of arrays (a matrix). To create a populated board of size n:
// 		[ [<val>,<val>,<val>...], [<val>,<val>,<val>...], [<val>,<val>,<val>...] ] - Where each <val> is whatever value you want at that location on the board
//    EXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])


// board.get(n) will return the 'n' index row array of the board (assuming that instance exists)
// board.set(key, value) will create a new key/value pair in the board object.
//  Key should be the row index number and the value should be a row array

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  // create a new board using:
  // var board = new Board({n:n});
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
