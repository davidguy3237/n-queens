// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // you're given a row index, which gives you the row array
      let row = this.get(rowIndex); // gives you the row array at the given rowIndex
      // iterate through that row array
      let counter = 0; // keep track of how many squares are occupied
      for (let i = 0; i < row.length; i++) {
        // if at least 2 indexes in that row array are occupied, then return true
        if (row[i] > 0) {
          counter ++;
        }
        if (counter >= 2) {
          return true;
        }
      }
      // else return false
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // iterate through every row array
      let n = this.get('n');
      for (let i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // if at least 2 indexes in any row array are occupied, then return true
      // else return false
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // you're given a column index, which is an index inside of each row array
      let col = this.get(colIndex);
      let boardSize = this.get('n');
      let counter = 0;
      for (let i = 0; i < boardSize; i++) {
        let row = this.get(i);
        if (row[colIndex] > 0) {
          counter++;
        }
      }

      if (counter >= 2) {
        return true;
      }
      // start at the very first row array
      // check if there is a conflict in that row array using hasRowConflictAt()
      // if there is NOT, then check the next row array
      // if there is a conflict, then return true, which will break out of the for loop
      // if there are no conflicts at all, then the for loop will end and this function will return false
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let boardSize = this.get('n');
      for (let i = 0; i < boardSize; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      // start at a column index of 0
      // check if there is a conflict at the given column index
      // if there is NOT, then check the next column
      // if there is, then return true, which will break out of the for loop
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, rowIndex) {
      var rowIndex = rowIndex || 0;
      //this.get(majorDiagonalColumnIndexAtFirstRow));
      // major diagonal:
      //[x]
      //   [ ]
      //      [ ]
      let boardSize = this.get('n');
      let counter = 0;
      let currentColumn = majorDiagonalColumnIndexAtFirstRow;
      for (let i = rowIndex; i < boardSize; i++) {
        let row = this.get(i);
        //console.log('row', row);
        if (row[currentColumn] > 0) {
          counter++;
        }
        currentColumn++;
      }

      if (counter >= 2) {
        return true;
      }
      // start at the specified row index and column index
      // go to the next row array (row index + 1) and the next column (column index + 1)
      // check if it is occupied, if it is, then return true
      // else continue to the next row array and the next column and repeat process until the end
      // if no conflicts found, return false
      return false; // fixme
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Iterate through the entire first row
      // Iterate through the first column in every row
      let boardSize = this.get('n');
      // console.log('board size', boardSize);
      for (let column = 0; column < boardSize; column++) {
        //console.log('column', column);
        if (this.hasMajorDiagonalConflictAt(column)) {
          return true;
        }
      }

      for (let row = 0; row < boardSize; row++) {
        if (this.hasMajorDiagonalConflictAt(0, row)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    /* matrix provided in test spec
    var matrix = [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    */
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow, rowIndex) {
      let boardSize = this.get('n');

      var rowIndex = rowIndex || boardSize - 1;
      // minor diagonal:
      //       [x]
      //    [ ]
      // [x]
      let counter = 0;
      let currentColumn = minorDiagonalColumnIndexAtFirstRow;
      for (let i = rowIndex; i >= 0; i--) {
        let row = this.get(i);

        if (row[currentColumn] > 0) {
          counter++;
        }
        currentColumn++;
      }

      if (counter >= 2) {
        return true;
      }
      // start at the specified row array and column index
      // go to the previous row array (row index - 1) and the next column (column index + 1)
      // check if it is occupied, if it is, then return true
      // else continue the even more previous row, and the next column and repeat process until the end
      // if not conflict found, return false
      return false; // fixme

      /* EXTRA STUFF==================
      // var rowIndex = rowIndex || 0;
      // let boardSize = this.get('n');
      // let counter = 0;
      // let currentColumn = minorDiagonalColumnIndexAtFirstRow;
      // for (let i = 0; i < boardSize, i++;) {
      //   let row = this.get(i);
      //   if (row[currentColumn] > 0) {
      //     counter++;
      //   }
      //   currentColumn--;
      // }
      // if (counter >= 2) {
      //   return true;
      // }
      ===============================*/
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // iterate through the first column index of every row
      // iterate through the entire last row array
      let boardSize = this.get('n');
      // console.log('board size', boardSize);
      for (let column = 0; column < boardSize; column++) {
        //console.log('column', column);
        if (this.hasMinorDiagonalConflictAt(column)) {
          return true;
        }
      }

      for (let row = 0; row < boardSize; row++) {
        if (this.hasMinor_DiagonalConflictAt(0, row)) {
          return true;
        }
      }
      return false; // fixme
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
