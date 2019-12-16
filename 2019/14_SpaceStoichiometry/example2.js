
const convert = (combination) => {
  switch(combination[1]) {
    case XJWVT: 

      return convertFromXJWVT(combination)
      break;
    case HKGWZ: 
      return convertFromHKGWZ(combination)
      break;
    case KHKGT: 
      return convertFromKHKGT(combination)
      break;
    case NZVS: 
      return convertFromNZVS(combination)
      break;
    case DCFZ: 
      return convertFromDCFZ(combination)
      break;
    case QDVJ: 
      return convertFromQDVJ(combination)
      break;
    case GPVTF: 
      return convertFromGPVTF(combination)
      break;
    case PSHF: 
      return convertFromPSHF(combination)
      break;
    case ORE: 
      return [combination]
      break;
    default:
        throw 'bug!'
  }
}

const converter = (from, ...rest) => {

  return (quantityObj) => { //1 AB
    
    return rest.map(r => {
      console.log((r[0]*quantityObj[0])/from[0])
     return  [(r[0]*quantityObj[0])/from[0], r[1]]
    })

  }
}
const simplify = (reactions) => {
  return reactions.reduce((acc, react) => {
    if(acc[react[1]]) {
      return {
        ...acc,
        [react[1]]: acc[react[1]] + react[0]
      }
    } else {
      return {
        ...acc,
        [react[1]]: react[0]
      }
    }
  }, {})
}

let NZVS = 'NZVS'
let ORE = 'ORE'
let DCFZ = 'DCFZ'
let XJWVT = 'XJWVT'
let KHKGT = 'KHKGT'
let QDVJ = 'QDVJ'
let GPVTF = 'GPVTF'
let HKGWZ = 'HKGWZ' 
let PSHF = 'PSHF'

  let ratios = {
    NZVS: 5n,
    DCFZ: 6n,
    QDVJ: 9n,
    ORE: 1n,
    PSHF: 7n,
    HKGWZ: 5n,
    XJWVT: 2n,
    GPVTF: 2n,
    KHKGT: 8n,
  }

const calculateMultiplier = (combination, multiplier=1n) => combination.reduce((fuelsToMake, combination) =>  {
  console.log(fuelsToMake * BigInt(ratios[combination[1]]))
  return fuelsToMake * BigInt(ratios[combination[1]])
}, multiplier)

// 157 ORE => 5 NZVS
const convertFromNZVS = converter([5n, NZVS], [157n, ORE])
// 165 ORE => 6 DCFZ
const convertFromDCFZ = converter([6n, DCFZ], [165n, ORE])
// 179 ORE => 7 PSHF
const convertFromPSHF = converter([7n, PSHF], [179n,ORE])
// 177 ORE => 5 HKGWZ
const convertFromHKGWZ = converter([5n, HKGWZ], [177n, ORE])
// 165 ORE => 2 GPVTF
const convertFromGPVTF = converter([2n, GPVTF], [165n,ORE])
// 12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
const convertFromQDVJ = converter([9n, QDVJ], [8n, PSHF], [1n, GPVTF], [12n, HKGWZ])
// 7 DCFZ, 7 PSHF => 2 XJWVT
const convertFromXJWVT = converter([2n, XJWVT], [7n, PSHF], [7n, DCFZ])
// 3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT
const convertFromKHKGT = converter([8n, KHKGT], [10n,PSHF], [5n, HKGWZ], [7n, NZVS], [3n, DCFZ])


// 44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
let FUEL = [[44n, XJWVT],[ 5n ,KHKGT], [1n ,QDVJ], [29n, NZVS], [9n, GPVTF], [48n ,HKGWZ]]
let step = 1



// GLOBAL_MULTIPLIER = calculateMultiplier(FUEL, GLOBAL_MULTIPLIER)
let GLOBAL_MULTIPLIER = 302400n

FUEL = FUEL.map(combination => [combination[0]* GLOBAL_MULTIPLIER, combination[1]])

while (step<3) {
  FUEL = FUEL
  .map(combination =>  convert(combination))
  .reduce((acc,s) => [...acc, ...s]) // flatten
  step+=1
} 
console.log(`GLOBAL_MULTIPLIER ${GLOBAL_MULTIPLIER}`)
console.log(FUEL)
FUEL= Object.entries(simplify(FUEL)).map( a => [a[1], a[0]])
console.log(FUEL[0][0]/GLOBAL_MULTIPLIER)