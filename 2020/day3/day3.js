const fs = require('fs');

const moveBy = (slopeX, slopeY) => ([x, y]) => [x + slopeX, y + slopeY]

const treesBySlope = (input) => (slopeFunction, initialPosition = [0, 0], counter = {}) => {
  let [x, y] = slopeFunction(initialPosition)
  if (input[y] == undefined) {
    return counter
  }

  if (x >= input[y].length) {
    x = x - input[y].length
  }

  if (input[y][x] == '#') {
    counter['#'] = (counter['#'] || 0) + 1
  }

  return treesBySlope(input)(slopeFunction, [x, y], counter)
}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  input = data.toString()
    .split('\n')
    .map(a => a.split(""));

  const treeCounter = treesBySlope(input)

  answer1 = treeCounter(moveBy(3, 1))['#']
  
  answer2 = treeCounter(moveBy(1, 1))['#'] *
    treeCounter(moveBy(3, 1))['#'] *
    treeCounter(moveBy(5, 1))['#'] *
    treeCounter(moveBy(7, 1))['#'] *
    treeCounter(moveBy(1, 2))['#']


  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)

})