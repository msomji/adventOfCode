const fs = require('fs');

const format = input => {
  return input.reduce((formatted, current) => {
    [key, bags] = current.split(/contains?/)
    const childBags = bags.replace(/bags?\.?/g, "").split(',')
      .map(f => {
        sd = f.match(/(\d+) (.*)/)
        if (sd == undefined ) {
          return ['NOT_A_COLOR', '0']
        }
        return [sd[2], sd[1]]
      })
      .reduce((acc, c) => {
        return {
          ...acc,
          [c[0].trim()]: parseInt(c[1].trim())
        }
      }, {})
    return {
      ...formatted,
      [key.replace(/bags?/, "").trim()]: childBags
    }
  }, {})
}

const containBag = (allBags, color) =>{
  if (color == 'NOT_A_COLOR') {
    return false
  }

  innerBag = allBags[color]
   if (innerBag['shiny gold']) {
     return true
   }
   return Object.keys(innerBag).some(innerColor => {
     return containBag(allBags, innerColor)
   })
}

const numberOfBags = (bags, color) => {
  total = 0
  if(color == 'NOT_A_COLOR') {
    return total
  }
  innerBag =  bags[color]
  Object.entries(innerBag).forEach(([color, count]) => {
    total += count
    total += numberOfBags(bags, color) * count
  })
  return total
}
const p2 = formattedinput => {
  return numberOfBags(formattedinput, 'shiny gold')
}

const p1 = formattedinput => {
  return Object.keys(formattedinput).filter(color => {
    return containBag(formattedinput, color)
  }).length
}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = data.toString()
    .split('\n')

  answer1 = p1(format(input1))
  answer2 = p2(format(input1))

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)
})