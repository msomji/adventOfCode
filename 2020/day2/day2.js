const fs = require('fs');
// Object
// {
//   letter: instuctions[1],
//   min: sizes[0],
//   max: sizes[1],
//   password: array[1]
// }
const ispasswordValid = obj => {
  occorances = obj['password'].split("").filter(l => l == obj['letter'])
  .length
   return occorances <= obj['max'] && occorances >= obj['min']
}

const ispasswordValid2 = obj => {
  password = obj['password'].split("")
  pos1 = password[parseInt(obj["min"]) - 1]
  pos2 = password[parseInt(obj['max']) - 1 ]
  letter = obj['letter']

  return (pos1  == letter && pos2 !== letter) || (pos2  == letter && pos1 !== letter)
}

const filter = (input, fn) => input.map(fn).filter(d => d == true).length

fs.readFile('./input.txt', (err, data) => { 
  if (err) throw err; 
  input = data.toString()
              .split('\n')
              .map(l => l.split(":"))
              .map(array => {
                instuctions = array[0].split(" ")
                sizes= instuctions[0].split('-')
                return {
                  letter: instuctions[1],
                  min: sizes[0],
                  max: sizes[1],
                  password: array[1].trim()
                }
              })

  answer1 = filter(input, ispasswordValid)
  answer2 = filter(input, ispasswordValid2)
  
  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)
})