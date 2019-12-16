
const convert = (combination) => {
  switch(combination[1]) {

    case  STKFG: return convertFromSTKFG(combination)
    case VPVL: return convertFromVPVL(combination)
    case FWMGM: return convertFromFWMGM(combination)
    case NVRVD: return convertFromNVRVD(combination)
    case JNWZP: return convertFromJNWZP(combination)
    case HVMC: return convertFromHVMC(combination)
    case GNMV: return convertFromGNMV(combination)
    case MNCFX: return convertFromMNCFX(combination)
    case CXFTF: return convertFromCXFTF(combination)
    case RFSQX: return convertFromRFSQX(combination)
    case VJHF: return convertFromVJHF(combination)


    case ORE: 
      return [combination]
      break;
    default:
        throw 'bug!'
  }
}

const converter = (from, ...rest) => {
  console.log('from')
  console.log(from)
  console.log('rest')
  console.log(rest)

  return (quantityObj) => {
    
    return rest.map(r => {
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


let STKFG = 'STKFG', MNCFX = 'MNCFX', VJHF= 'VJHF', HVMC= 'HVMC', CXFTF= 'CXFTF', GNMV= 'GNMV', ORE='ORE', VPVL='VPVL', FWMGM = 'FWMGM',
JNWZP='JNWZP', NVRVD='NVRVD', RFSQX='RFSQX'


let FUEL = [[53n ,STKFG], [6n ,MNCFX], [46n ,VJHF], [81n ,HVMC], [68n ,CXFTF], [25n ,GNMV]]

// 2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
let convertFromSTKFG = converter([1n, STKFG], [2n, VPVL], [7n, FWMGM], [2n, CXFTF],[11n, MNCFX])
// 17 NVRVD, 3 JNWZP => 8 VPVL
let convertFromVPVL = converter([8n,VPVL], [3n,JNWZP], [17n,NVRVD])

// 22 VJHF, 37 MNCFX => 5 FWMGM
let convertFromFWMGM = converter([5n,FWMGM], [37n,MNCFX], [22n,VJHF])
// 139 ORE => 4 NVRVD
let convertFromNVRVD = converter([4n,NVRVD], [139n,ORE])
// 144 ORE => 7 JNWZP
let convertFromJNWZP = converter([7n,JNWZP], [144n,ORE])
// 5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
let convertFromHVMC = converter([3n,HVMC], [5n, MNCFX], [7n, RFSQX], [2n, FWMGM], [2n, VPVL], [19n, CXFTF])

// 5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
let convertFromGNMV = converter([6n,GNMV], [5n, VJHF], [7n, MNCFX], [9n, VPVL], [37n, CXFTF])
// 145 ORE => 6 MNCFX
let convertFromMNCFX = converter([6n,MNCFX], [145n,ORE])
// 1 NVRVD => 8 CXFTF
let convertFromCXFTF = converter([8n,CXFTF], [1n,NVRVD])
// 1 VJHF, 6 MNCFX => 4 RFSQX
let convertFromRFSQX = converter([4n,RFSQX], [1n,VJHF], [6n, MNCFX])
// 176 ORE => 6 VJHF
let convertFromVJHF = converter([6n,VJHF], [176n,ORE])


let step = 1

let GLOBAL_MULTIPLIER = 23224320n

FUEL = FUEL.map(combination => [combination[0]* GLOBAL_MULTIPLIER, combination[1]])

while (step<50) {
  FUEL = FUEL
  .map(combination =>  convert(combination))
  .reduce((acc,s) => [...acc, ...s]) // flatten
  step+=1
} 
console.log(`GLOBAL_MULTIPLIER ${GLOBAL_MULTIPLIER}`)
console.log(FUEL)
FUEL= Object.entries(simplify(FUEL)).map( a => [a[1], a[0]])
console.log('FUEL')
console.log(FUEL)
console.log(FUEL[0][0]/GLOBAL_MULTIPLIER)

//answer = 180697