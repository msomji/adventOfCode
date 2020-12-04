const fs = require('fs');

const PASSWORD_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] //  'cid']
const EYE_COLOR = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const isValidHgt = hgt => {
  [a, b, ...rest] = hgt.split('').reverse()
  num = parseInt(rest.reverse().join(''))
  return [b, a].join('') == 'cm' ? (num >= 150 && num <= 193) : (num >= 59 && num <= 76)
}
const isvalidHcl = hcl => {
  [a, ...rest] = hcl.split('')
  return rest.join('').match(/^[a-f0-9]*$/) && rest.join('').length == 6
}
const isvalidEcl = e => EYE_COLOR.includes(e)

const isvalidPid = p => !!p.match(/^\d{9}$/)

const isBetween = (num, min, max) => num >= min && num <= max

const part1 = input => {
  return input.filter(obj => PASSWORD_FIELDS.every(e => Object.keys(obj).includes(e)))
}

const part2 = input => {
  return input.filter(obj => {
    return PASSWORD_FIELDS.every(e => Object.keys(obj).includes(e)) &&
      isBetween(obj['byr'], 1920, 2002) &&
      isBetween(obj['iyr'], 2010, 2020) &&
      isBetween(obj['eyr'], 2010, 2030) &&
      isValidHgt(obj['hgt']) &&
      isvalidHcl(obj['hcl']) &&
      isvalidEcl(obj['ecl']) &&
      isvalidPid(obj['pid']
      )
  })
}

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  input = data.toString()
    .split('\n\n')

    .map(a => a.replace(/\n/g, " "))
    .map(a => a.split(" "))
    .map(a => a.reduce((acc, cur) => {
      [key, value] = cur.split(":")
      return {
        ...acc,
        [key]: value
      }

    }, {}));

  answer1 = part1(input).length
  answer2 = part2(input).length


  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)

})
