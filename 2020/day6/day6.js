const fs = require('fs');

const p1 = input => {
  return input.reduce((total, group) => {
    counts = group.split('').reduce((obj, letter) => {
      obj[letter] = 1
      return obj
    }, {})
    return Object.keys(counts).length + total
  }, 0)
}

const buildAlphaObject = string => 
   string.split("").reduce((acc, l) => {
    acc[l] = acc[l] ? acc[l] + 1 : 1
    return acc
  }, {})

const mergeObjects = (mergeTo, otherObject) => {
  Object.keys(otherObject).forEach(key => {
    mergeTo[key] = mergeTo[key] ? mergeTo[key] + otherObject[key] : otherObject[key]
  })
  return mergeTo
}

const p2 = input => {
  return input.map(d => {
    if ('string' == typeof d) {
      return d.length
    } else {
      const groupLength = d[0].length
      const objectsByLetterCount = d[0].map(buildAlphaObject)
      const combined = objectsByLetterCount.reduce(mergeObjects, {})
      const numOfAllYes = Object.keys(combined).reduce((sum, key) => combined[key] === groupLength ? sum + 1 : sum, 0)
      return numOfAllYes
    }
  }).reduce((a, s) => a + s, 0)
}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = data.toString()
    .split('\n\n')
    .map(a => a.replace(/\n/g, ""))

  const input2 = data.toString()
    .split('\n\n')
    .map(a => {
      if (a.includes('\n')) {
        return [a.split(/\n/)]
      }
      return a
    })

  answer1 = p1(input1)
  answer2 = p2(input2)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)
})