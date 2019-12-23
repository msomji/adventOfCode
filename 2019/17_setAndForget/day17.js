const fs = require('fs');
const readline = require('readline');
const Intcode = require('./intcode');
const  main = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({input: fileStream});

  for await (const rawInput of rl) {
    let input = rawInput.split(',').map(Number)
    part1([...input])
    part2([...input])
    
  }
}
const SCAFFOLD = '#'
const OPEN_SPACE = '.'
const NEW_LINE = '\n'
const LEFT = '<'
const RIGHT = '>'
const UP = '^'
const DOWN = 'V'
const FALLEN = 'X'

const drawViewPath = (view) => {
  return view.reduce((map, current) => {
    if (current == NEW_LINE.charCodeAt()) {
      return [...map, []]
    } else {
      let lastRow = map[map.length -1] 
      if(current === SCAFFOLD.charCodeAt()) {
        image = SCAFFOLD
      } else if(current == LEFT.charCodeAt()) {
        image = LEFT
      } else if(current == RIGHT.charCodeAt()) {
        image = RIGHT
      }  else if(current == UP.charCodeAt()) {
        image = UP
      } else if(current == DOWN.charCodeAt()) {
        image = DOWN
      } else if(current == FALLEN.charCodeAt()) {
        image = FALLEN
      } else {
        image = OPEN_SPACE
      }
      lastRow.push(image)
    }
    return map
  }, [[]])
}

const isAtIntersection = (row, column, map) => {
  
  if(row +1 > map.length-1 || column +1 > map[0].length-1 || row-1 < 0 || column-1 < 0) {
    return false
  }
  return map[row+1][column] === SCAFFOLD &&
  map[row-1][column] === SCAFFOLD &&
  map[row][column+1] === SCAFFOLD &&
  map[row][column] === SCAFFOLD &&
  map[row][column-1] === SCAFFOLD 
}

const findAllIntersecting = (PathMap) => {
  let intersections = []
  PathMap.forEach((_, row) => {
    PathMap[0].forEach((_, column) => {
      if(isAtIntersection(row, column, PathMap)) {
        intersections.push([row,column])
      }
    })
  })
  return intersections
}
const part1= (input) => {
  let viewPAth = new Intcode(input).process()
  let twoDMap = drawViewPath(viewPAth.solution)
  let allIntersection = findAllIntersecting(twoDMap)
  allIntersection.forEach(c => twoDMap[c[0]][c[1]] = 'O')
  let alignment = allIntersection.reduce((sum, coor) => sum + (coor[0]* coor[1]), 0)
  console.log('part 1')
  console.log(alignment)
  console.log(twoDMap.map(arr => arr.join('')))
}

const part2 = (input) => {
  console.log('part 2')
  input.shift()
  let newInput = [2, ...input] 
  let movement = new Intcode(newInput).process()
  let mainMovementRoutine = [
    'C'.charCodeAt(),
    ','.charCodeAt(),
    'A'.charCodeAt(),
    ','.charCodeAt(),
    'A'.charCodeAt(),
    ','.charCodeAt(),
    'B'.charCodeAt(),
    ','.charCodeAt(),
    'B'.charCodeAt(),
    ','.charCodeAt(),
    'C'.charCodeAt(),
    ','.charCodeAt(),
    'C'.charCodeAt(),
    ','.charCodeAt(),
    'A'.charCodeAt(),
    ','.charCodeAt(),
    'A'.charCodeAt(),
    ','.charCodeAt(),
    'B'.charCodeAt(),
    '\n'.charCodeAt(),
  ]
  let movementA = [
    'R'.charCodeAt(),
    ','.charCodeAt(),
    '1'.charCodeAt(),
    '2'.charCodeAt(),
    ','.charCodeAt(),
    'R'.charCodeAt(),
    ','.charCodeAt(),
    '4'.charCodeAt(),
    ','.charCodeAt(),
    'L'.charCodeAt(),
    ','.charCodeAt(),
    '1'.charCodeAt(),
    '2'.charCodeAt(),
    '\n'.charCodeAt(),
  ] 
  let movementB = [
    'R'.charCodeAt(),
    ','.charCodeAt(),
    '1'.charCodeAt(),
    '2'.charCodeAt(),
    ','.charCodeAt(),
    'R'.charCodeAt(),
    ','.charCodeAt(),
    '4'.charCodeAt(),
    ','.charCodeAt(),
    'L'.charCodeAt(),
    ','.charCodeAt(),
    '6'.charCodeAt(),
    ','.charCodeAt(),
    'L'.charCodeAt(),
    ','.charCodeAt(),
    '8'.charCodeAt(),
    ','.charCodeAt(),
    'L'.charCodeAt(),
    ','.charCodeAt(),
    '8'.charCodeAt(),
    '\n'.charCodeAt(),
  ]
  let movementC = [
    'L'.charCodeAt(),
    ','.charCodeAt(),
    '1'.charCodeAt(),
    '2'.charCodeAt(),
    ','.charCodeAt(),
    'R'.charCodeAt(),
    ','.charCodeAt(),
    '4'.charCodeAt(),
    ','.charCodeAt(),
    'R'.charCodeAt(),
    ','.charCodeAt(),
    '4'.charCodeAt(),
    '\n'.charCodeAt(),
  ]
  let video = [
    'n'.charCodeAt(), 
    '\n'.charCodeAt()]
  let allInputs =[
    ...mainMovementRoutine,
     ...movementA,
      ...movementB,
       ...movementC,
        ...video
      ]
    let location = 0
  while(movement.next !== undefined) {
    
    movement = movement.next(allInputs[location])
    location+=1
  }
  let drawing =  drawViewPath(movement.solution)
  console.log(drawing.map(arr => arr.join('')))
  console.log(movement.solution[movement.solution.length-1])

}
module.exports = main('input.txt')