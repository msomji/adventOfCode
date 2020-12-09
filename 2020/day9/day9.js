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

const sumFirstAndLastElement  = (list) => list[0] + list[list.length -1 ]

const p2 = (formattedInput, sumToLookFor) => {
  let currentSum = 0
  indexesToBuildSum = []
  for (let i = 0; i <= formattedInput.length; i++) {
    potentialSum = currentSum + formattedInput[i]
    if (potentialSum < sumToLookFor) {
      indexesToBuildSum.push(i)
      currentSum += formattedInput[i]
    } else if (potentialSum > sumToLookFor) {
      oldIndexesToBuildSum = indexesToBuildSum

      while (potentialSum >= sumToLookFor && indexesToBuildSum.length>0) {
        [initial, ...rest] = indexesToBuildSum

        sumOfallButFirst = rest.map(index => formattedInput[index]).reduce((a, c) => a + c, 0)
        allbutfistSumPotential = sumOfallButFirst + formattedInput[i]
        if (allbutfistSumPotential === sumToLookFor) {
          rest.push(i)
          return sumFirstAndLastElement(rest.map(index => formattedInput[index]).sort((a, b) => a - b))
        }
        indexesToBuildSum = rest
      }
      // reset indexes
      indexesToBuildSum = oldIndexesToBuildSum
      indexesToBuildSum.push(i)
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