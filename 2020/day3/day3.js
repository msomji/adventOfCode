const fs = require('fs');
const move = ([x,y], [slopeX, slopeY]) => [x+slopeX, y+slopeY]

const treesBySlope = (input, slopeX =3,slopeY=1 )=> {
  let [x, y] = [0,0]
  let treeCount = 0
  while (y < input.length) {
    [x,y] = move([x,y], [slopeX,slopeY])
    if (input[y] == undefined) {
      return treeCount
    }

    if (x >= input[y].length) {
      x = x - input[y].length
    }

    if(input[y][x] == '#') {
      treeCount = treeCount +=1
    }
  }
  return treeCount
}


fs.readFile('./input.txt', (err, data) => { 
  if (err) throw err; 
  input = data.toString()
              .split('\n')
              .map(a => a.split(""))
             
  answer1 = treesBySlope(input)
  answer2 = treesBySlope(input,1,1) *
            treesBySlope(input,3,1) *
            treesBySlope(input,5,1) *
            treesBySlope(input,7,1) *
            treesBySlope(input,1,2) 
  
  console.log(`answer1: ${answer1}`)
  console.log(`answer2: ${answer2}`)
})