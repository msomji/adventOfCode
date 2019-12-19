const fs = require('fs');
const readline = require('readline');

const main = async (path) => {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({input: fileStream})

  rl.on("line", (line) =>{
    let input = line.split('').map(Number)
      console.log(`part1: ${calculateOutputAtPhase(input, 100).slice(0,8)}`)
      // console.log(`part2: ${part2(input)}`)
  })

}

const part2 = (input) => {
  let part2Input = new Array(10000).fill('').reduce((acc) => [...acc, input], []).flat()
  let indexOfMessage = [...part2Input].slice(0,7).join('')
  return calculateOutputAtPhase(part2Input, 100).slice(indexOfMessage, indexOfMessage+8)



}

const calculateOutputAtPhase = (input, numberOfPhases, pattern = [0,1,0,-1]) => {
  return new Array(numberOfPhases).fill('').reduce((nextInput, _) => {
    currentInput = nextInput || input
    return calculatePhase(currentInput, pattern)
  }, undefined).join('')
}

const calculatePhase = (input, pattern = [0,1,0,-1]) => {
  return input.reduce((acc, _, index) => {
    return [...acc, calculatePhaseForPosition(input, index+1, pattern)]
  }, [])
}

const calculatePhaseForPosition = (input, numberPosition =1, pattern) => {
  let currentPattern = buildPatternForElementNumber(numberPosition, input.length, pattern)
  let phaseOutput = input.reduce((sum, current, index) => {
    return sum + (current * currentPattern[index])
  }, 0)
  return Math.abs(phaseOutput) %10

}

const buildPatternForElementNumber = (elementNumber, length, pattern) => {
  let patternWithRespectToPosition = pattern.reduce((preShiftedPattern, current) => {
    return [...preShiftedPattern, ...new Array(elementNumber).fill('').map((_) => current)]
  }, [])
  return makePatternOfLength(patternWithRespectToPosition, length+ elementNumber).splice(1, length)
}

const makePatternOfLength = (pattern, length, accumulatedPattern = []) => {
  if(accumulatedPattern.length > length) {
    accumulatedPattern.length = length
    return accumulatedPattern;
  }
  return makePatternOfLength(pattern, length, [...accumulatedPattern, ...pattern])
}

module.exports = main('./inputs.txt')