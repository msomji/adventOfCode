const fs = require('fs');

const p1 = input => {
  return input
    .map(a => a.replace(/\n/g, ""))
    .map(a => new Set(a.split('')))
    .map(s => s.size)
    .reduce((a, s) => a + s, 0)

}

const p2 = input =>
  input
    .map(x => x.split('\n'))
    .map(group => {
      firstPerson = group[0].split('')
      commonAnswerWithFirstPerson = firstPerson.filter(answer => group.every(person => person.includes(answer)))
      return commonAnswerWithFirstPerson
    })
    .map(s => s.length)
    .reduce((a, s) => a + s, 0)


fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = data.toString()
    .split('\n\n')

  const input2 = data.toString()
    .split('\n\n')

  answer1 = p1(input1)
  answer2 = p2(input2)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)
})