const fs = require('fs');

const findProductPairForTotal = (input, total, additionalArg = 1) => {
  for(let i = 0; i < input.length; i++) { 
    let current = input[i]
    let numToLookFor = total - current
    if (input.includes(numToLookFor)) {
      return current * numToLookFor * additionalArg
    }
  }
}

const findtriple = (input) => {
  for(let i = 0; i < input.length; i++) {
    let current = input[i]
    let sumToFill = 2020 - current
     let product = findProductPairForTotal(input, sumToFill, current)
     if (product !== undefined) {
       return product
     }
  }
}

fs.readFile('./input.txt', (err, data) => { 
  if (err) throw err; 
  input = data.toString().split('\n').map(Number)
  answer1 = findProductPairForTotal(input, 2020)
  answer2 = findtriple(input)
  
  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)
})