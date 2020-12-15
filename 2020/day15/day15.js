const fs = require('fs');
const { last } = require('lodash');

const p1 = (input, itterations) => {
  memoryMap = new Map() // numSaid : [last 2 turns]
  let mostRecentNumber = 0
  let currentIndex = 0
  currentTurn = 1
  input.forEach((num, index) => {
    if (memoryMap.has(num)) {
      memoryMap.set(num, [Math.max(...memoryMap.get(num)), currentTurn])
    } else {
      memoryMap.set(num, [currentTurn])
    }
    mostRecentNumber = num
    currentIndex = index
    currentTurn +=1
    itterations-=1
  })
  while (itterations > 0) {
    if (memoryMap.has(mostRecentNumber) && memoryMap.get(mostRecentNumber).length > 1) {
      let last = memoryMap.get(mostRecentNumber)[memoryMap.get(mostRecentNumber).length - 1]
      let lastBfore = memoryMap.get(mostRecentNumber)[memoryMap.get(mostRecentNumber).length - 2]
      let age = last - lastBfore
      if (memoryMap.has(age)) {
        memoryMap.set(age, [Math.max(...memoryMap.get(age)), currentTurn])

      } else {
        memoryMap.set(age, [currentTurn])
      }
      mostRecentNumber = age

    } else {
      if (memoryMap.has(0)) {
        memoryMap.set(0, [Math.max(...memoryMap.get(0)), currentTurn])

      } else {
        memoryMap.set(0, [currentTurn])
      }
      mostRecentNumber = 0
    }
    itterations -= 1
    currentIndex += 1
    currentTurn +=1
  }

  return mostRecentNumber
}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;

  answer1 = p1([15,5,1,4,7,0], 2020)
  console.log(`answer1: ${answer1}`)
  answer2 = p1([15,5,1,4,7,0], 30000000)
  console.log(`answer2: ${answer2}`)


})