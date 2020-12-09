const fs = require('fs');

const format = input => {
  return input
    .split('\n')
    .map(Number)
}

containsSum = (list, sum) => {
  for (let j = 0; j <= list.length; j++) {
    for (let k = 0; k <= list.length; k++) {
      if (list[j] + list[k] == sum) {
        return true
      }
    }
  }
}

const p1 = (formattedInput, backNumber) => {
  for (let i = backNumber; i <= formattedInput.length; i++) {
    currentSum = formattedInput[i]
    look = [...formattedInput].splice(i - backNumber, i)
    if (!containsSum(look, currentSum)) {
      return currentSum
    }
  }
}

const sumFirstAndLastElement = (list) => list[0] + list[list.length - 1]

const p2 = (formattedInput, sumToLookFor) => {
  indexesToBuildSum = []
  for (let i = 0; i <= formattedInput.length; i++) {
    indexesToBuildSum.push(i)
    calculatedSum = indexesToBuildSum.map(index => formattedInput[index]).reduce((a, c) => a + c, 0)
    if (calculatedSum > sumToLookFor) {

      let remainingIndexes = indexesToBuildSum
      while (calculatedSum >= sumToLookFor && remainingIndexes.length > 0) {
        [_, ...remainingIndexes] = remainingIndexes
        shifedCalculatedSum = remainingIndexes.map(index => formattedInput[index]).reduce((a, c) => a + c, 0)

        if (shifedCalculatedSum === sumToLookFor) {
          return sumFirstAndLastElement(remainingIndexes.map(index => formattedInput[index]).sort((a, b) => a - b))
        }
      }
    }
  }
}


fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString())

  answer1 = p1(input1, 25)
  answer2 = p2(input1, answer1)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)
})