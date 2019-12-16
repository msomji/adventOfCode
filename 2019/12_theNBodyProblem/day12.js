let INITIAL_VELOCTY = [
  [0,0,0],
  [0,0,0],
  [0,0,0],
  [0,0,0],
];
const X_AXIS = 0
const Y_AXIS = 1
const Z_AXIS = 2

const getIncrementFunction = (interest, comparator) => {
  if (interest > comparator) {
    return num => num - 1
  } else if (interest < comparator) {
    return num => num + 1
  } else {
    return num => num + 0
  }
}
const increment = (pointOfInterest, comparators) => 
   comparators
      .map(comp => getIncrementFunction(pointOfInterest, comp))
      .reduce((acc, incrementfn) =>  incrementfn(acc), pointOfInterest)
  
const transpose = (xValues, yValues, zValues) => {
  return xValues.map((_, index) => {
    return [xValues[index], yValues[index], zValues[index]]
  })
}
  
const getNextPosition = (positions, velocity, axis) => {
    let aAxis = positions[0][axis]
    let bAxis = positions[1][axis]
    let cAxis = positions[2][axis]
    let dAxis = positions[3][axis]
    return [
      increment(aAxis, [bAxis, cAxis, dAxis]) + velocity[0][axis],
      increment(bAxis, [aAxis, cAxis, dAxis]) + velocity[1][axis],
      increment(cAxis, [bAxis, aAxis, dAxis]) + velocity[2][axis],
      increment(dAxis, [bAxis, cAxis, aAxis]) + velocity[3][axis],
    ]
  }

const calculateVelocity = (positions, newPositions, axis) => {
  
  return [
    newPositions[0][axis] - positions[0][axis] ,
    newPositions[1][axis] - positions[1][axis] ,
    newPositions[2][axis] - positions[2][axis] ,
    newPositions[3][axis] - positions[3][axis] 
  ]
}

const calculateNextPositionAndVelocity = (currentPositions, currentVelocities) => {
    let nextPositions = transpose(
    getNextPosition(currentPositions, currentVelocities, X_AXIS),
    getNextPosition(currentPositions, currentVelocities, Y_AXIS),
    getNextPosition(currentPositions, currentVelocities, Z_AXIS)
    )
    let nextVelocities = transpose(
    calculateVelocity(currentPositions, nextPositions, X_AXIS),
    calculateVelocity(currentPositions, nextPositions, Y_AXIS),
    calculateVelocity(currentPositions, nextPositions, Z_AXIS),
    )
    return {
      nextPositions,
      nextVelocities
    }
}

const calculateEnergy = (attributes) => attributes.reduce((sum, a) => sum + Math.abs(a), 0)

const calculateTotalEnergyForMoon = (position, velocity) => calculateEnergy(position) * calculateEnergy(velocity)

const calculategivenSteps = (steps, initialPositions) => {
  return Array(steps).fill('').reduce((acc, _,) => {
    let positionsAndVelocities = calculateNextPositionAndVelocity(acc.nextPositions, acc.nextVelocities)
    let totalEnergy = calculateEnergy(
      [calculateTotalEnergyForMoon(positionsAndVelocities.nextPositions[0], positionsAndVelocities.nextVelocities[0]),
      calculateTotalEnergyForMoon(positionsAndVelocities.nextPositions[1], positionsAndVelocities.nextVelocities[1]),
      calculateTotalEnergyForMoon(positionsAndVelocities.nextPositions[2], positionsAndVelocities.nextVelocities[2]),
      calculateTotalEnergyForMoon(positionsAndVelocities.nextPositions[3], positionsAndVelocities.nextVelocities[3])]
    )
    return {
      totalEnergy,
      ...positionsAndVelocities,
    }
  }, {nextPositions: initialPositions, nextVelocities: INITIAL_VELOCTY, totalEnergy: 0})
}

let INITIAL_POSITIONS_1 = [
  [-1, 0, 2],
  [2,-10,-7],
  [4,-8,8],
  [3,5,-1]
];
let INITIAL_POSITIONS_2 = [
  [-8, -10, 0],
  [5,5,10],
  [2,-7,3],
  [9,-8,-3]
];

let INITIAL_POSITIONS_INPUT = [
  [1, -4, 3],
  [-14,9,-4],
  [-4,-6,7],
  [6,-9,-11]
];


console.log(calculategivenSteps(15, INITIAL_POSITIONS_INPUT))
