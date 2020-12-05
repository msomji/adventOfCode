const fs = require('fs');

const bisect = (input, predicate, range) =>
  input.reduce((acc, cur) => {
    hrange = (acc['max'] - acc['min']) / 2
    return predicate(cur) ?
      {
        max: acc['max'] - hrange,
        min: acc['min']
      }
      :
      {
        max: acc['max'],
        min: acc['min'] + hrange,
      }
  }, range)

const p1 = input =>
  input.map(pass => {
    row = pass.slice(0, 7)
    col = pass.slice(-3)
    let r = bisect(row, c => c === 'F', { min: 0, max: 128 })
    let c = bisect(col, c => c === 'L', { min: 0, max: 8 })

    return {
      row: row.slice(-1) == 'F' ? r['min'] : (r['max'] - 1),
      col: col.slice(-1) == 'R' ? c['min'] : (c['max'] - 1)
    }
  }).map(d => (d['row'] * 8) + d['col'])
    .sort((a, b) => b - a)


const p2 = input =>
  p1(input).reduce((acc, c) => c == acc ? acc - 1 : acc, 918)


fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  input = data.toString()
    .split('\n')
    .map(s => s.split(''))

  answer1 = p1(input)[0]
  answer2 = p2(input)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)


})
