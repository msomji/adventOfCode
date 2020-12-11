const fs = require('fs');

const format = input => {
  return input
    .split('\n')
    .map(s => s.split(''))
}

const gradientsGenerator = () => {
  range = [-1, 0, 1]
  grads = []
  for (let r = 0; r < range.length; r++) {
    for (let ry = 0; ry < range.length; ry++) {
      if(!(r === 1 && ry === 1)) {
        grads.push([range[r], range[ry]])
      }
    }
  }
  return grads
}

const numInView = (map, [y, x]) => {
  
  gradients = gradientsGenerator()

  let visibleCount = 0
  for (let grad = 0; grad < gradients.length; grad++) {
    gy = gradients[grad][0]
    gx = gradients[grad][1]
    let cY = y
    let cX = x
    visibleTaken = false
    while (visibleTaken == false && map[cY + gy] !== undefined && map[cY + gy][cX + gx] !== undefined) {
      nextStep = [cY + gy, cX + gy]
      newPos = map[cY + gy][cX + gx]
      if (newPos == 'L') {
        break;
      }
      if (visibleTaken == false && newPos == '#') {

        visibleTaken = true
        visibleCount += 1
      }
      cY = cY + gy
      cX = cX + gx
    }
  }
  return {
    '#': visibleCount
  }
}
const numOfAdjacentEmpty = (map, [y, x]) => {

  return gradientsGenerator()
  .map(([gy,gx]) => map[y+gy] ?map[y+gy][x+gx]:0 )
  .filter(d => d !== 0)
    .reduce((a, b) => {
      a[b] = a[b] + 1
      return a
    }, { '#': 0, 'L': 0, '.': 0 })
}
const loop = (formattedInput, finder, tooManySeats) => {
  ys = new Array(formattedInput.length).fill('V')
  xs = new Array(formattedInput[0].length).fill('V')
  newOutput = ys.map(s => [...xs])
  for (let y = 0; y < formattedInput.length; y++) {
    for (let x = 0; x < formattedInput[0].length; x++) {
      current = formattedInput[y][x]
      num = finder(formattedInput, [y, x])
      if (current === 'L' && num['#'] == 0) {
        newOutput[y][x] = '#'
      } else if (current === '#' && num['#'] >= tooManySeats) {
        newOutput[y][x] = 'L'
      } else {
        newOutput[y][x] = formattedInput[y][x]
      }
    }
  }
  return newOutput
}
const findTaken = (input) => {
  return input.map(d => d.join('')).join('').split('').reduce((a, c) => {
    return c == '#' ? a + 1 : a
  }, 0)
}
const p1 = formattedInput => {
  input = formattedInput
  let numofTaken = 0
  let count = 0
  while (count < 100) {
    input = loop(input, numOfAdjacentEmpty, 4)
    numofTaken = findTaken(input)
    count += 1
  }
  return numofTaken
}
const p2 = formattedInput => {
  input = formattedInput
  numofTaken = 0 //#
  changed = true
  let count = 0
  while (count < 100) {
    input = loop(input, numInView, 5)
    numofTaken = findTaken(input)
    count += 1
  }
  return numofTaken
}


fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString())

  answer1 = p1(input1)
  answer2 = p2(input1)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)

})