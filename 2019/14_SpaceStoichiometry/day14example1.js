const converter = (from, ...rest) => {
  return (quantityObj) => { //1 AB
    if (quantityObj[1] !== from[1]) return [ quantityObj ] // if not correct input return
    if (quantityObj[0] < from[0]) return [ quantityObj ] // if not enough quantity
    return [...rest, ...converter(from, ...rest)([quantityObj[0]-from[0], quantityObj[1]])]
    // }
  }
}

let ORE = 'ORE'
let A = 'A'
let B = 'B'
let C = 'C'
let AB = 'AB'
let BC = 'BC'
let CA = 'CA';

let FUEL = [[2,AB], [3,BC], [4,CA]]
// 9 ORE => 2 A
const convertFromA = converter([2,A], [9, ORE])
// 8 ORE => 3 B
const convertFromB = converter([3,B], [8, ORE])
// 7 ORE => 5 C
const convertFromC = converter([5,C], [7, ORE])
// 3 A, 4 B => 1 AB
const convertFromAB = converter([1,AB], [3, A], [4,B])
// 5 B, 7 C => 1 BC
const convertFromBC = converter([1,BC], [5, B], [7,C])
// 4 C, 1 A => 1 CA
const convertFromCA = converter([1,CA], [1, A], [4,C])



const convert = (chemical, quantity) => {
  switch(chemical) {
    case A:
      return convertFromA(quantity)  
    case B:  
      return convertFromB(quantity)
    case C:  
      return convertFromC(quantity)
    case AB:  
      return convertFromAB(quantity)
    case BC:  
      return convertFromBC(quantity)
    case CA:  
      return convertFromCA(quantity)
  }
}

const simplify = (reactions) => {
  return reactions.reduce((acc, react) => {
    if(acc[react[0]]) {
      return {
        ...acc,
        [react[0]]: acc[react[0]] + react[1]
      }
    } else {
      return {
        ...acc,
        [react[0]]: react[1]
      }
    }
  }, {})
}

while (FUEL.length==1) {
  let converted = FUEL.map(combination =>  convert(...combination))
  FUEL = Object.entries(simplify(converted))
}
console.log(FUEL)
