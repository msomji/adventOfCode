
const fs = require('fs');

const dec2bin = (dec) => {
  str = '000000000000000000000000000000000000'
  binary = dec.toString(2).padStart(str.length, "0")
  return binary
}

const format = input => {
  return input
    .split('mask = ')
    .filter(d => d !== '')
    .map(s => s.split('\n'))
    .reduce((a, c) => {
      [mask, ...mems] = c
      return [
        ...a,
        {
          mask,
          values: mems.filter(d => d !== '').map(d => d.split('=')).reduce((b, [mem, value]) => {
            number = mem.match(/(\d+)/)
            console.log
            return [
              ...b,
              {
                location: parseInt(number),
                value: dec2bin(parseInt(value))
              }
            ]
          }, [])
        }
      ]
    }, [])

}


const p1 = (formattedInput) => {
  memory = {}
  formattedInput.forEach(({ mask, values }) => {
    currentMask = mask.split('')
    values.forEach(({ location, value }) => {
      curentValue = value.split('')
      curentValue.forEach((l, index) => {
        if (currentMask[index] !== 'X') {
          curentValue[index] = currentMask[index]
        }
      })

      num = parseInt(curentValue.join(''), 2)
      memory[location] = num

    })
  })
  return Object.values(memory).reduce((a, b) => a + b, 0)
}

const findFloatingOptions = (address) => {
  const indexofX = address.indexOf('X')
  if (indexofX === -1) {
    return [address]
  }
  address[indexofX] = '1'
  let a = findFloatingOptions([...address])
  address[indexofX] = '0'
  let b = findFloatingOptions([...address])
  
  return a.concat(b)
}

const p2 = (formattedInput) => {
  let memory = {}
  formattedInput.forEach(({ mask, values }) => {
    currentMask = mask.split('')
    values.forEach(({ location, value }) => {
      currentMemoryaddress = dec2bin(location).split('')
      currentMemoryaddress.forEach((l, index) => {
        if (currentMask[index] === '1') {
          currentMemoryaddress[index] = '1'
        }
        if (currentMask[index] === 'X') {
          currentMemoryaddress[index] = 'X'
        }
      })
      numberofFloaters = currentMemoryaddress.filter(d => d === 'X').length

      addresses = findFloatingOptions([...currentMemoryaddress])
      for (let add of addresses) {
        memory[parseInt(add.join(""), 2)] = parseInt(value, 2)
      }
    })
  })
  return Object.values(memory).reduce((a, b) => a + b, 0)
}



fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;
  const input1 = format(data.toString())
  const input2 = format(data.toString())


  answer1 = p1(input1)
  answer2 = p2(input2)

  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)

})