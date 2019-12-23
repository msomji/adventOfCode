const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');
const Intcode = require('./intcode');
let pathsObj;
const  main = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({input: fileStream});

  for await (const rawInput of rl) {
    let input = rawInput.split(',').map(Number)
        findOxygenSystem(new Intcode(input).process().next(SOUTH), [0,0], 1, ['0,0'])
        draw(walls, paths,oxygenSystem, HAPPYPATH)
        pathsObj = buildPathsObj(paths, oxygenSystem)
        console.log(`it takes ${part2()} minutes to fill everything with oxygen`)

  }
}
let walls= []
let paths = []
let HAPPYPATH = []
let oxygenSystem =[]

// direction
const NORTH = 1
const SOUTH = 2
const WEST = 3
const EAST = 4

// output
const WALL_AHEAD = 0
const SUCCESSFULLY_MOVED = 1
const AT_OXYGEN_SYSTEM = 2

const getCoord = (currentCoord, direction) => {
  switch (direction) {
    case NORTH: return [currentCoord[0], currentCoord[1]+1]
    case SOUTH: return [currentCoord[0], currentCoord[1]-1]
    case EAST: return [currentCoord[0]+1, currentCoord[1]]
    case WEST: return [currentCoord[0]-1, currentCoord[1]]

  }
}

const potententialNexSteps =(currentLocation) => {
  return [NORTH, SOUTH, EAST, WEST].reduce((acc, direction) => {
    let potentialNext = getCoord(currentLocation, direction).join(',');
    if(!walls.includes(potentialNext) && !paths.includes(potentialNext)) {
      return [...acc, direction]
    }
    return acc
  }, [])
}

const cloneDroides = (droid, currentLocation, stepNumber, happyPath) => {
    let potentialNexts = potententialNexSteps(currentLocation)
    potentialNexts.forEach(direction => {
      findOxygenSystem(droid.next(direction), getCoord(currentLocation, direction), stepNumber+1, [...happyPath, getCoord(currentLocation, direction).join(',')])
    })
}

const findOxygenSystem = (droid, currentLocation, stepNumber, happyPath ) => {
  let currentSolution = droid.solution[0]
  if (currentSolution === WALL_AHEAD) {
    walls.push(currentLocation.join(','))
  } else if (currentSolution === AT_OXYGEN_SYSTEM) {
    oxygenSystem.push(currentLocation.join(','))
    HAPPYPATH = happyPath
    console.log(`shortest distance to oxygen system: ${stepNumber}`)
  } else if (currentSolution === SUCCESSFULLY_MOVED) {
    paths.push(currentLocation.join(','))
    cloneDroides(droid, currentLocation, stepNumber, happyPath)
  }
}

draw = (walls, paths,oxygenSystem, happy) => {
        const xCoords = [...walls, ...paths, ...oxygenSystem, ...happy].map(coord => coord.split(',')[0]);
        const yCoords = [...walls, ...paths, ...oxygenSystem, ...happy].map(coord => coord.split(',')[1]);

        const maxX = Math.max(...xCoords);
        const minX = Math.min(...xCoords);
        const maxY = Math.max(...yCoords);
        const minY = Math.min(...yCoords);
  console.log('-------------MAP-----------------------')
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            

            if(['0,0'].includes([x,y].join(','))) {
              process.stdout.write('X')
          } else if(happy.includes([x,y].join(','))) {
              oxygenSystem.includes([x,y].join(','))? process.stdout.write('O') :process.stdout.write('.') ;
            }
            else if(walls.includes([x,y].join(','))) {
               process.stdout.write('w');
            } else if(paths.includes([x,y].join(','))) {
              process.stdout.write('.');
            } else {
              process.stdout.write(' ');
            }
            
        }
        console.log();
        }
    }
const buildPathsObj = (pathsArray, oxygentLocation) => {
  return pathsArray.reduce((obj, p) => {
    return {
      ...obj,
      [p]: 'OPEN',
      [oxygentLocation[0]]: 'O'
    }
  }, {})
}
const spreadOxygen = (initialCoord, direction) => {
    let nextStep = getCoord(initialCoord.split(',').map(Number), direction).join(',')
    if (pathsObj[nextStep] === 'OPEN') {
      pathsObj[nextStep] = 'O'
    }
}
const getCoordsOfOxygen = () => Object.entries(pathsObj).filter(d => d[1] === 'O').map(s => s[0])

const spreadEachDirectionOnce =(directions = [EAST,WEST, SOUTH, NORTH]) => 
        getCoordsOfOxygen().forEach(coord => directions.forEach(d => spreadOxygen(coord, d)))

const part2 = () => {
  let count = 0
  while(getCoordsOfOxygen().length < Object.keys(pathsObj).length) { //while not fuly oxyginated
    spreadEachDirectionOnce()
    count+=1
  }
  return count;
}

module.exports = main('input.txt')