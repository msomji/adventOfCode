
const addTurn = (map, key, value) => {
  if (map.has(key)) {
    map.set(key, [Math.max(...map.get(key)), value])
  } else {
    map.set(key, [value])
  }
}
const p1 = (input, itterations) => {
  memoryMap = new Map() // numSaid : [last 2 turns]
  let mostRecentNumber = 0
  let currentIndex = 0
  currentTurn = 1
  input.forEach((num, index) => {
    addTurn(memoryMap, num, currentTurn)

    mostRecentNumber = num
    currentIndex = index
    currentTurn += 1
    itterations -= 1
  })
  while (itterations > 0) {
    if (memoryMap.has(mostRecentNumber) && memoryMap.get(mostRecentNumber).length > 1) {
      let last = memoryMap.get(mostRecentNumber)[memoryMap.get(mostRecentNumber).length - 1]
      let lastBfore = memoryMap.get(mostRecentNumber)[memoryMap.get(mostRecentNumber).length - 2]
      let age = last - lastBfore

      addTurn(memoryMap, age, currentTurn)

      mostRecentNumber = age

    } else {
      addTurn(memoryMap, 0, currentTurn)
      mostRecentNumber = 0
    }
    itterations -= 1
    currentIndex += 1
    currentTurn += 1
  }
  return mostRecentNumber
}


answer1 = p1([15, 5, 1, 4, 7, 0], 2020)
console.log(`answer1: ${answer1}`)

answer2 = p1([15, 5, 1, 4, 7, 0], 30000000)
console.log(`answer2: ${answer2}`)

