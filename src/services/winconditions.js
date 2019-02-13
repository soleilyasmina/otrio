// WIN CONDITIONS


// 1. SAME PIECES ON SAME SPACE

const sameSpace = (spaces) => {
  console.log(spaces);
  return spaces.some(space => {
    let { small, medium, large } = space;
    if ( small === medium && medium === large && large !== null ) {
      return true;
    }
  })
}

const main = (spaces) => {
  return sameSpace(spaces);
}

export default main;
