const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');

const  main = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({input: fileStream});
  let recipies = []
  for await (const line of rl) {
    recipies.push(line)
  }

  console.log(`part1: ${calculateOreNeeded(format(recipies), 'FUEL', 1)}`)
  console.log(`part2: ${search(format(recipies), 1000000000000)}`)
}

const search = (recipies, oreLimit) => {
  let lowOreUsed = 0
  let midOreUsed = 0
  let highOreUsed = oreLimit
  let fuelForMid
  while(lowOreUsed <= highOreUsed) {
    fuelForMid = Math.ceil((highOreUsed+lowOreUsed)/2)
    midOreUsed = calculateOreNeeded(recipies, 'FUEL', fuelForMid)
    if(midOreUsed == oreLimit ) {
      return  fuelForMid // number of fuels made to create one trillion
    } else if(midOreUsed < oreLimit) {
      lowOreUsed = fuelForMid+1
    } else if(midOreUsed > oreLimit) {
      highOreUsed = fuelForMid-1
    }
  }
  return midOreUsed > oreLimit?  fuelForMid - 1: fuelForMid //last mid fuel 
}

const calculateOreNeeded = (recipies, product, amount, leftover= {}) => {
  let needed = amount - (leftover[product] || 0)
  if(needed <= 0) {
    leftover[product] = leftover[product] -amount
    return 0
  }
  let amountProducedPerRecipie = recipies[product].amount
  let recipieMultiplier = Math.ceil(needed/ amountProducedPerRecipie)
  leftover[product] = amountProducedPerRecipie * recipieMultiplier - needed
  return recipies[product].recipie
    .map(({amount, chemical}) => 
      chemical === 'ORE' ? 
      amount * recipieMultiplier : 
      calculateOreNeeded(recipies, chemical, amount * recipieMultiplier, leftover)
    )
    .reduce((sum,a) => sum+a, 0)

}

const format = (formulas) => {
  return formulas.reduce((formatted, formula) => {
    const [reactants, outputs] = formula.split('=>')
    const [quantity, chemical ]= outputs.trim().split(' ')
    return {
      ...formatted,
      [chemical]: {
        amount: quantity,
        recipie: reactants.trim().split(", ")
        .map(combo => combo.trim().split(' '))
        .map(([amount, chemical]) => ({amount, chemical}))
      }
    }
  }, {})
}

module.exports = main('example4.txt')