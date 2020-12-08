const fs = require('fs');

const format = input => {
  return input
    .map(d => d.split(' '))
    .map(([action, number]) => [action, parseInt(number)])
}

const p1 = (formattedInput, accumulatorTracker = () => { }) => {
  accumulator = 0
  offset = 0
  visitedIndexes = []
  for (var i = 0; true; i++) {
    visitingIndex = i + offset

    if (visitedIndexes.includes(visitingIndex)) {
      // returning because its going in an infinite loop after this
      return accumulator
    }
    visitedIndexes.push(visitingIndex)

    let [action, number] = formattedInput[i + offset]

    if (action == 'nop') {

    } else if (action == 'acc') {
      accumulator += number
    } else if (action == 'jmp') {

      offset += (number - 1)
    }
    // console.log(`accumulator ${accumulator}`)
    accumulatorTracker(accumulator)
  }
}


const p2 = (formattedInput, accumulatorTracker) => {
  indexesWhereThereISJmpOrNoOp = []
  formattedInput.forEach(([action, number], index) => {
    if (action == 'nop' || action == 'jmp') {
      indexesWhereThereISJmpOrNoOp.push(index)
    }
  })
  indexesWhereThereISJmpOrNoOp.forEach(index => {
    let newUsage = [...formattedInput]
    let [action, number] = newUsage[index]
    if (action === 'nop') {
      newUsage[index] = ['jmp', number]
    } else {
      newUsage[index] = ['nop', number]
    }
    p1(newUsage, accumulatorTracker)
  })
}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString().split('\n'))

  answer1 = p1(input1)
  console.log(`answer1: ${answer1}`)

  let finalAccumulatorValue = 0
  try {
    p2(input1, accum => finalAccumulatorValue = accum)

  } catch (error) {

    console.log(`answer2: ${finalAccumulatorValue}`)
  }
})