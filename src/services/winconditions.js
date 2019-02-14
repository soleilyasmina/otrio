// WIN CONDITIONS


// 1. SAME PIECES ON SAME SPACE

const sameSpace = (spaces) => {
  return spaces.some(space => {
    let { small, medium, large } = space;
    if ( small === medium && medium === large && large !== null ) {
      return true;
    }
  })
}

// 2. GENERIC CHECK FUNCTION
// 8 possible win paths:
// 3 horizontal, 3 vertical, 2 diagonal
 
const check = (conditions, spaces) => {
  let [first, second, third] = conditions;
  switch(true) {
      // horizontal cases
    case spaces[0][first] === spaces[1][second] &&
        spaces[1][second] === spaces[2][third] &&
        spaces[2][third] !== null:
      console.log(1);
      return true;
    case spaces[3][first] === spaces[4][second] &&
        spaces[4][second] === spaces[5][third] &&
        spaces[5][third] !== null:
      console.log(2);
      return true;
    case spaces[6][first] === spaces[7][second] &&
        spaces[7][second] === spaces[8][third] &&
        spaces[8][third] !== null:
      console.log(3);
      return true;

    // vertical cases
    case spaces[0][first] === spaces[3][second] &&
        spaces[3][second] === spaces[6][third] &&
        spaces[6][third] !== null:
      console.log(4);
      return true;
    case spaces[1][first] === spaces[4][second] &&
        spaces[4][second] === spaces[7][third] &&
        spaces[7][third] !== null:
      console.log(5);
      return true;
    case spaces[2][first] === spaces[5][second] &&
        spaces[5][second] === spaces[8][third] &&
        spaces[8][third] !== null:
      console.log(6);
      return true;

    // diagonal cases
    case spaces[0][first] === spaces[4][second] &&
        spaces[4][second] === spaces[8][third] &&
        spaces[8][third] !== null:
      console.log(7);
      return true;
    case spaces[6][first] === spaces[4][second] &&
        spaces[4][second] === spaces[2][third] &&
        spaces[2][third] !== null:
      console.log(8);
      return true;

    default:
      return false;
  }
}

const main = (spaces) => {
  return sameSpace(spaces) ||
    check(['small', 'medium', 'large'], spaces) ||
    check(['large', 'medium', 'small'], spaces) ||
    check(['small', 'small', 'small'], spaces) ||
    check(['medium', 'medium', 'medium'], spaces) ||
    check(['large', 'large', 'large'], spaces);
}

export default main;
