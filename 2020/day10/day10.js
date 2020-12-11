const fs = require('fs');

const format = input => {
  return input
    .split('\n')
    .map(Number)
}


const p1 = (formattedInput) => {
  let effectiveRating = 0
  let jolts = new Map()
  jolts.set(1, 0)
  jolts.set(2, 0)
  jolts.set(3, 0)

  highestRatedAdapter = Math.max(...formattedInput) +3
  sorted = [...formattedInput, highestRatedAdapter].sort((a, b) => a - b)
  sorted.forEach(jolt => {
    let difference = jolt - effectiveRating
    if(jolts.has(difference)) {
      jolts.set(difference, jolts.get(difference) + 1)
      effectiveRating += difference
    }
  })
  return jolts.get(1) * jolts.get(3)
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
  console.log(`answer2: ${answer2}`)

})