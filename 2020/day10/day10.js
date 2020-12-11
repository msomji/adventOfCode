const fs = require('fs');

const format = input => {
  return input
    .split('\n')
    .map(Number)
}


const p1 = (formattedInput) => {
  let jolts = {}
  let effectiveRating = 0
  sorted = formattedInput.sort((a, b) => a - b)
  highestRatedAdapter = sorted[sorted.length - 1] + 3
  for (let i = 0; i < sorted.length; i++) {
    if (effectiveRating < sorted[i] + 3) {
      let difference = sorted[i] - effectiveRating

      jolts[difference] = jolts[difference] ? jolts[difference] + 1 : 1

      effectiveRating += difference
    }
  }
  diff = highestRatedAdapter - effectiveRating
  jolts[diff] = jolts[diff] ? jolts[diff] + 1 : 1
  return jolts[1] * jolts[3]
}
const p2 = formattedInput => {
  sortedJolts = formattedInput.sort((a,b) => a-b)
  const pathsToJolt = new Map()
  pathsToJolt.set(0,1)
  const differences = [1,2,3]
  sortedJolts.forEach(jolt => {
    pathsToJolt.set(jolt, 0)

    differences.forEach(diff => {
      if(pathsToJolt.has(jolt - diff)) { // has valid jolts
        pathsToJolt.set(jolt, pathsToJolt.get(jolt) + pathsToJolt.get(jolt-diff) )
      }
    })
  });
  return pathsToJolt.get(Math.max(...sortedJolts))

}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString())

  // console.log(input1)



  answer1 = p1(input1)
  answer2 = p2(input1)
  console.log(`answer1: ${answer1}`)
  console.log(answer2)
})