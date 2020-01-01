const fs = require('fs');
const readline = require('readline');

const  main = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({input: fileStream});
  let view= []
  for await (const rawInput of rl) {
    view.push(rawInput.split(''))

    
  }
// console.log(getStartLocation(cloneView(view)))
  // console.log(openDoor(view, 'a'))
  pathFinder(cloneView(view))
}

const moveRight = ([x,y]) => [x+1, y]
const moveLeft = ([x,y]) => [x-1, y]
const moveUp = ([x,y]) => [x, y-1]
const moveDown = ([x,y]) => [x, y+1]

const getStartLocation  = (view) => {
  return view.reduce((location, row, index) => {
    if(row.includes('@')) {
      return [row.indexOf('@'),index]
    }
    return location
  }, undefined)
}
const cloneView = view => view.reduce((newView, row )=> {
  newView.push([...row])
  return newView
}, [])
const containsKeysOrDoors = (view) => {
  return view.flat().filter(s => s !== '.').filter(s => s !== '#').filter(s => s !== '@').length >0
}

const openDoor = (view, key) =>  cloneView(view).map(row => row.map(e => e == key.toUpperCase() ? '.' : e))


const pathFinder = view => {
  let potential = [{view, steps:0}] 
  let again = true
  while (again) {
    potential.forEach(current => {
      if (!containsKeysOrDoors(cloneView(current.view))) { 
        console.log(current.steps)
        again = false
      }
      let nextStep = collectKeys(current.view, current.steps)
      let happy = nextStep
      .filter(s => s.skip !== true)
      potential = [...potential, ...happy]
    })
  }
}

const collectKeys = (view, steps =0) => {
    const [currentX, currentY] = getStartLocation(cloneView(view))
    
    let nextCoordinate = [moveLeft, moveRight, moveDown, moveUp]
          .map(direction =>direction([currentX, currentY]))
          .filter(coords => coords[0] <= view[0].length-1 && coords[0] >=0)
          .filter(coords => coords[1] <= view.length-1 && coords[0] >=0)
          .filter(([x,y]) => view[y][x] !=='#')
          // .filter(([x,y]) => [x,y].join('') !== [previousX, previousY].join(''))
    let potentials = []
    for (let i = 0; i <= nextCoordinate.length-1; i++) {
      let [x,y] = nextCoordinate[i]
      if (view[y][x] === '.') {
        let nextView = cloneView(view)
        nextView[currentY][currentX] = '.'
        nextView[y][x] = '@'
        potentials.push({ view: nextView,
          steps: steps+1,
        })
      } else if (view[y][x] === view[y][x].toLowerCase()) { // is a key
        let nextView = openDoor(view, view[y][x])
        nextView[currentY][currentX] = '.'
        nextView[y][x] = '@'
        potentials.push({ view: nextView,
          steps: steps+1,
          
        })
      }
    }

    return potentials
  }
module.exports = main('example.txt')