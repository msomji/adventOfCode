const fs = require('fs');
const readline = require('readline');

let doneView;
const  main = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({input: fileStream});
  let view= []
  for await (const rawInput of rl) {
    view.push(rawInput.split(''))

    
  }
let initialViewState = new ViewState(view)
calculate(initialViewState)
console.log(doneView.stepsTaken)



}

const calculate = viewState => {
  let nextviews = pathToShortestDistance(viewState)
  for(v of nextviews) {
    if (v.isDone) {
      if (doneView === undefined || v.stepsTaken < doneView.stepsTaken) {
        doneView = v
      }
    } else {
      if (doneView === undefined || v.stepsTaken < doneView.stepsTaken) {
        calculate(v)
      }
    }
  }
}

const pathToShortestDistance = viewState => {
    let keys = getAllKeys(viewState.view)
    return keys.map(key => moveToKey(viewState, key)) 
}

class KeyInfo {
  constructor(key, steps, position) {
    this.key = key
    this.stepsToKey = steps
    this.position = position
  }
}

class ViewState {
  constructor(view, stepsTaken=0){
    this.view = view
    this.stepsTaken = stepsTaken
    this.isDone = isDone(view)
  }
}
const moveRight = ([x,y]) => [x+1, y]
const moveLeft = ([x,y]) => [x-1, y]
const moveUp = ([x,y]) => [x, y-1]
const moveDown = ([x,y]) => [x, y+1]

const getStartLocation  = (view) => {
  return [...view].reduce((location, row, index) => {
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


const getAllKeys = (view, steps =1, visited =[]) => {
  const [x1,y1] = getStartLocation(view)
  return [moveUp, moveDown, moveRight, moveLeft].reduce((acc, direction) => {
    let [x,y] = direction([x1,y1])
    if(visited.includes([x,y].join(','))){
      return acc;
    }
    switch (view[y][x]) {
      case '#':
        break
      case '.':
        let updated = cloneView(view)
        updated[y1][x1] = '.'
        updated[y][x] = '@'
        acc.push(...getAllKeys(updated, steps+1, [...visited, [x,y].join(',')]))
        break;
      case view[y][x].toLowerCase():
        acc.push(new KeyInfo(view[y][x], steps, [x,y]))
        break;
    }
    return acc;
  }, [])
}
const openDoor =(view, door) => {
  return view.map(row => row.map(d => d ==door?  '.': d))
}
const isDone = view => {
  let isDone = true
  view.forEach(row =>{
    row.forEach(e => {
      if(e !== '.' && e !== '#' && e !== '@') {
        isDone = false
      }
    })
  }
  )
  return isDone;

}
const moveToKey = (viewState, key) => {
  const [x1,y1] = getStartLocation(viewState.view)
  const [keyX, keyY] = key.position
  let newView = cloneView(viewState.view)
  newView[y1][x1] = '.'
  newView[keyY][keyX] = '@'
  newView = openDoor(newView, key.key.toUpperCase())
  return new ViewState(newView, viewState.stepsTaken+key.stepsToKey)
}
module.exports = main(process.env.PWD+'/example3.txt')
