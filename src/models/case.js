class Case {

  static get EMPTY()       { return { value: 0, toString: "EMPTY"       }; }
  static get BLACK_PAWN()  { return { value: 1, toString: "BLACK_PAWN"  }; }
  static get BLACK_QUEEN() { return { value: 2, toString: "BLACK_QUEEN" }; }
  static get WHITE_PAWN()  { return { value: 3, toString: "WHITE_PAWN"  }; }
  static get WHITE_QUEEN() { return { value: 4, toString: "WHITE_QUEEN" }; }

  // Transform an array of chars into an array of CaseBoard
  static toCaseBoard(board) {
    let caseBoard = [];
    board.forEach((line, i) => {
      caseBoard.push([]);
      line.forEach((row) => {
        switch(row) {
          case '0':
            caseBoard[i].push(Case.EMPTY);
            break;
          
          case '1':
            caseBoard[i].push(Case.BLACK_PAWN);
            break;

          case '2':
            caseBoard[i].push(Case.BLACK_QUEEN);
            break;

          case '3':
            caseBoard[i].push(Case.WHITE_PAWN);
            break;

          case '4':
            caseBoard[i].push(Case.WHITE_QUEEN);
            break;
          
          default:
            caseBoard[i].push(Case.EMPTY);
            break;
        }
      });
    });
    return caseBoard;
  }

  static toCharBoard(board) {
    let charBoard = [];
    board.forEach((line, i) => {
      charBoard.push([]);
      line.forEach((row) => {
        charBoard[i].push(`${row.value}`);
      });
    });
    return charBoard;
  }

  static toNumberBoard(board) {
    let charBoard = [];
    board.forEach((line, i) => {
      charBoard.push([]);
      line.forEach((row) => {
        charBoard[i].push(row.value);
      });
    });
    return charBoard;
  }

  static toString(board) {
    let boardStr = '';
    board.forEach((line, i) => {
      line.forEach((row) => {
        boardStr += row.value;
      });
    });
    return boardStr;
  }

  static stringToNumber(board) {
    let charBoard = [];
    board.split('').forEach((line, i) => {
      if (i % 9 == 0) {
        charBoard.push([]);
      }
      charBoard[i].push(line);
    });
    return charBoard;
  }

  static numberToCaseBoard(board) {
    let caseBoard = [];
    board.forEach((line, i) => {
      caseBoard.push([]);
      line.forEach((row) => {
        switch(row) {
          case 0:
            caseBoard[i].push(Case.EMPTY);
            break;
          
          case 1:
            caseBoard[i].push(Case.BLACK_PAWN);
            break;

          case 2:
            caseBoard[i].push(Case.BLACK_QUEEN);
            break;

          case 3:
            caseBoard[i].push(Case.WHITE_PAWN);
            break;

          case 4:
            caseBoard[i].push(Case.WHITE_QUEEN);
            break;
          
          default:
            caseBoard[i].push(Case.EMPTY);
            break;
        }
      });
    });
    return caseBoard;
  }
}


module.exports = Case;