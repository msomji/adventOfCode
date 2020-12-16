
const fs = require('fs');

const format = input => {
  [ranges, ticket, nearby] = input.split('\n\n')
  nearBy = nearby.split('nearby tickets:\n')[1].split('\n').map(s => s.split(',')).flat(Infinity).map(Number)
  validNumbers = ranges.split('\n').map(d => d.split(':')[1].split(' or ').map(s => s.trim().split('-')))
    .reduce((a, [b, c]) => {
      let [min1, max1] = b
      let [min2, max2] = c

      for (let i = parseInt(min1); i <= parseInt(max1); i++) {
        a.push(i)
      }
      for (let i = parseInt(min2); i <= parseInt(max2); i++) {
        a.push(i)
      }

      return a
    }, [])
  return {
    nearBy,
    validNumbers
  }
}
const format2 = input => {
  [ranges, ticket, nearby] = input.split('\n\n')
  nearBy = nearby.split('nearby tickets:\n')[1].split('\n').map(s => s.split(',')).map(s => s.map(Number))
  formattedRanges = ranges.split('\n').map(s => s.split(':'))
    .reduce((a, c) => {
      let [key, value] = c
      foo = value.split(' or ').map(s => s.trim().split('-'))
        .reduce((a, [min, max]) => {



          for (let i = parseInt(min); i <= parseInt(max); i++) {
            a.push(i)
          }

          return a
        }, [])
      return {
        ...a,
        [key]: foo
      }
    }, {})
  validNumbers = ranges.split('\n').map(d => d.split(':')[1].split(' or ').map(s => s.trim().split('-')))
    .reduce((a, [b, c]) => {
      let [min1, max1] = b
      let [min2, max2] = c

      for (let i = parseInt(min1); i <= parseInt(max1); i++) {
        a.push(i)
      }
      for (let i = parseInt(min2); i <= parseInt(max2); i++) {
        a.push(i)
      }

      return a
    }, [])
  return {
    nearBy,
    validNumbers,
    ranges: formattedRanges,
    ticket: ticket.split(':')[1].replace('\n', '').split(',').map(Number)
  }
}

const p1 = (formattedInput) => {
  return formattedInput
  ['nearBy']
    .filter(s => !formattedInput['validNumbers'].includes(s))
    .reduce((a, c) => a + c)
}

const p2 = (formattedInput) => {

  validTickets = formattedInput['nearBy']
    .filter(s => s.filter(d => !formattedInput['validNumbers'].includes(d)).length == 0)

  let validTicketByColumns = validTickets
    .reduce((a, row) => {
      row.map((column, index) => {
        a[index] = [...a[index], column]
      })
      return a
    }, new Array(validTickets[0].length).fill([]))


  let possibleColumns = validTicketByColumns.map(col => {
    matches = []
    Object.entries(formattedInput['ranges'])
      .forEach(([key, valids]) => {
        if (col.every(e => valids.includes(e))) {
          matches.push(key)
        }
      })
    return matches
  })

  byCols = {}
  while (Object.entries(byCols).length !== Object.entries(formattedInput['ranges']).length) {
    for (let i = 0; i < possibleColumns.length; i++) {
      if (possibleColumns[i].length === 1) {
        byCols[possibleColumns[i][0]] = i

        possibleColumns = possibleColumns
          .map(row => row.filter(f => {
            return !(f === possibleColumns[i][0])
          }))
      }
    }
  }
  return  Object.entries(byCols).reduce((a, [key, colIndex]) => key.match(/departure/) ?  a* formattedInput['ticket'][colIndex] : a, 1)
}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString())
  const input2 = format2(data.toString())


  answer1 = p1(input1)
  answer2 = p2(input2)


  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)

})