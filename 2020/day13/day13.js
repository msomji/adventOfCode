const fs = require('fs');

const format = input => {
  foo = input
    .split('\n')
  return {
    initialEstimate: foo[0],
    busses: foo[1].split(',').filter(s => s !== 'x').map(Number)
  }
}
const format2 = input => {
  foo = input
    .split('\n')
  return {
    initialEstimate: foo[0],
    busses: foo[1].split(',').reduce((a, c, index) => {
      if (c !== 'x') {
        return {
          ...a,
          [c]: index,
        }
      }
      return a
    }, {})
  }
}


const p1 = ({ initialEstimate, busses }) => {
  closestBusTime = {}
  busses.forEach(b => {
    currentTime = 0
    while (currentTime < initialEstimate) {
      currentTime = currentTime + b

    }

    closestBusTime[b] = currentTime - initialEstimate
  })
  return Math.min(...Object.entries(closestBusTime)
  .sort((a,b) => a[1] - b[1])
  .map(([busId, time]) => parseInt(busId) * time))
  

}


const findEarliest = (initialBusses, currentTimeItteration, busses) => {
  foo = busses.map(b => {
    return currentTimeItteration * b
  })
  if (difference(initialBusses, foo)) {
    return currentTimeItteration
  }
  return findEarliest(initialBusses, currentTimeItteration + 1, foo)
}
const p2 = ({ _, busses }) => {
  sorted = Object.entries(busses)
    .map(([busId, index]) => [parseInt(busId), index])
    .sort((a, b) => parseInt(a[1]) - parseInt(b[1])) // id, index

  let stepSize = sorted[0][0]
  let time = 0
  // console.log(stepSize)
  sorted.forEach(([busId, index]) => {
    if (busId == stepSize) return
    while ((time + index) % busId !== 0) {
      time += stepSize;
    }

    stepSize = lcm(stepSize, busId);
  })
  return time
}


const gcd = (a, b) => !b ? a : gcd(b, a % b)
const lcm = (a, b) => (a * b) / gcd(a, b)


fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString())
  const input2 = format2(data.toString())

  answer1 = p1(input1)
  answer2 = p2(input2)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)

})