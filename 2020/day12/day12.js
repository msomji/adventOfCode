const fs = require('fs');

const format = input =>
  input
    .split('\n')
    .map(s => {
      return {
        action: s.slice(0, 1),
        steps: parseInt(s.slice(1))
      }
    })

const turnRight = (curr) => {
  switch (curr) {
    case 'E':
      return 'S'
    case 'W':
      return 'N'
    case 'N':
      return 'E'
    case 'S':
      return 'W'
  }
}

const turnLeft = (curr) => {
  switch (curr) {
    case 'E':
      return 'N'
    case 'W':
      return 'S'
    case 'N':
      return 'W'
    case 'S':
      return 'E'
  }
}

const p1 = (formattedInput, direction = 'E') => {
  location = {
    'E': 0,
    'S': 0,
    'W': 0,
    'N': 0,
  }

  formattedInput.forEach(({ action, steps }) => {
    switch (action) {
      case 'F':
        location[direction] += steps
        break
      case 'N':
        location['N'] += steps
        break
      case 'E':
        location['E'] += steps
        break;
      case 'W':
        location['W'] += steps
        break
      case 'S':
        location['S'] += steps
        break;
      case 'R':
        deg = steps
        while (deg > 0) {
          direction = turnRight(direction)
          deg = deg - 90
        }
        break;
      case 'L':
        deg = steps
        while (deg > 0) {
          direction = turnLeft(direction)
          deg = deg - 90
        }
        break;
    }
  })

  return Math.abs(location['N'] - location['S']) + Math.abs(location['E'] - location['W'])
}

const rotateWayPointR = wayPoint => ({
  'N': wayPoint['W'],
  'E': wayPoint['N'],
  'S': wayPoint['E'],
  'W': wayPoint['S'],
})
const rotateWayPointL = wayPoint => ({
  'N': wayPoint['E'],
  'E': wayPoint['S'],
  'S': wayPoint['W'],
  'W': wayPoint['N'],
})

const p2 = (formattedInput) => {
  wayPoint = {
    'E': 10,
    'S': 0,
    'W': 0,
    'N': 1,
  }
  location = {
    'E': 0,
    'S': 0,
    'W': 0,
    'N': 0,
  }

  formattedInput.forEach(({ action, steps }) => {
    switch (action) {
      case 'F':
        for (let d of Object.keys(location)) {
          location[d] += wayPoint[d] * steps
        }
        break;
      case 'N':
        wayPoint['N'] += steps
        break;
      case 'E':
        wayPoint['E'] += steps
        break;
      case 'S':
        wayPoint['S'] += steps
        break;
      case 'W':
        wayPoint['W'] += steps
        break;
      case 'R':
        deg = steps
        while (deg > 0) {
          wayPoint = rotateWayPointR(wayPoint)
          deg = deg - 90
        }
        break
      case 'L':
        deg = steps
        while (deg > 0) {
          wayPoint = rotateWayPointL(wayPoint)
          deg = deg - 90
        }
    }
  })

  return Math.abs(location['N'] - location['S']) + Math.abs(location['E'] - location['W'])
}


fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString())

  answer1 = p1(input1)
  answer2 = p2(input1)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)

})