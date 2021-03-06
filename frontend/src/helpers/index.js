// @flow

const nestedArray = (row, col) => {
  let outerArray = [];
  for (let i = 0; i < row; i++) {
    let innerArray = [];
    for (let j = 0; j < col; j++) {
      innerArray.push("");
    }
    outerArray.push(innerArray);
  }
  return outerArray;
}
const populateNestedArray = (
  nestedArray,
  val,
  count
) => {
  let rows = nestedArray.length;
  let cols = nestedArray[0].length;
  while (count) {
    let y = floorRand(rows);
    let x = floorRand(cols);
    if (!nestedArray[y][x]) {
      nestedArray[y][x] = val;
      count--;
    }
  }
  return nestedArray;
}
const valsAdjacentCounts = (
  nestedArray,
  val
) => {
  for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[0].length; j++) {
      if (nestedArray[i][j] === val) {
        nestedArray = addOneNestedArrAdjacents(nestedArray, i, j, val);
      }
    }
  }
  return nestedArray;
}

const addOneNestedArrAdjacents = (
  nestedArray,
  i,
  j,
  val
) => {
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  for (let a of iList) {
    if (nestedArray[a]) {
      for (let b of jList) {
        if (nestedArray[a][b] !== undefined && nestedArray[a][b] !== val) {
          if (typeof nestedArray[a][b] !== "number") nestedArray[a][b] = 0;
          nestedArray[a][b]++;
        }
      }
    }
  }
  return nestedArray;
}
const floorRand = (scale) => {
  return Math.floor(Math.random() * scale);
}

const populatePlayedMap = (rows, cols) => {
  const map = []
  for (let i = 0; i < rows; i++) {
    map[i] = [];
    for (let j = 0; j < cols; j++) {
      map[i][j] = {clicked: false, value: ""};
    }
  }
  return map;
}
export {
  nestedArray,
  populateNestedArray,
  valsAdjacentCounts,
  populatePlayedMap
}
