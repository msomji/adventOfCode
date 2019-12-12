sorter = (a, b) => {
  if (a > b) {
    return -1;
  } else if (b > a) {
    return 1;
  } else {
    return 0;
  }
};

class MonitoringStation {

  getCoordinatesOfAllAstroides(map) {
   let coords = []
    map.forEach((yPlain, yCoord) => {
      yPlain.forEach((element, xCoord) => {
        if(element === "#" ) {
          coords.push([xCoord, yCoord])
        }
      });
    })
    return coords;
  }
    
  getAngleBetweenTwoPointsInRadians(startCoords, endCoords) {
    const [startX, startY] = startCoords
    const [endX, endY] = endCoords
    return Math.atan2(endY - startY, endX - startX)
  }

  getAngleInRadiansFromOrigin(originAsterid, otherAstroids) {
      return otherAstroids.map(other => this.getAngleBetweenTwoPointsInRadians(originAsterid, other))
  }
  
  buildAsteroidViewMap(allCoords)  {
    return allCoords.reduce((acc, origin) => {
      return {
        ...acc,
        [origin.toString()]: [...new Set(this.getAngleInRadiansFromOrigin(origin, allCoords))]
      }
    }, {})
  }

  coordinatesWithSameAngleToOrigin(allcoords, originCoord, radian) {
    const [originX, originY] = originCoord
    return allcoords.filter(destinationCoordinate => {
      const [endX, endY] = destinationCoordinate
        return Math.atan2(endY - originY, endX - originX) === radian
    })
  }
  
  findClosestCoordinate(origin, otherCoordinates) {
    let [originX, originY] = origin;
    return otherCoordinates.reduce((closest, current) => {
      let [closestX, closestY] = closest;
      let [currentX, currentY] = current;
        let distanceClosest = ((closestX-originX)**2) + ((closestY-originY)**2)
        let distanceCurrent = ((currentX-originX)**2) + ((currentY-originY)**2)
      return distanceClosest <= distanceCurrent? closest: current
    },  otherCoordinates[0])
  }


  handlePart2(input, coordinateOfRotation, lastStep = 200) {
    let allCoords = this.getCoordinatesOfAllAstroides(input)
    return this.getListOfAsteroidsToBeVanishedInorderInOneRotation(allCoords, coordinateOfRotation, lastStep)
  }
  getListOfAsteroidsToBeVanishedInorderInOneRotation(allCoords, coordinateOfRotation, lastStep= 200) {
    let [originX, originY] = coordinateOfRotation
    let asteroidMap = this.buildAsteroidViewMap(allCoords)
    let radiansOfVisibleAsteroids = asteroidMap[coordinateOfRotation]

    let visibleDegreeMap = radiansOfVisibleAsteroids.reduce((acc, radian) => {
      return {
        ...acc,
        [radian*(180/Math.PI)] : this.findClosestCoordinate([originX, originY], this.coordinatesWithSameAngleToOrigin(allCoords, [originX, originY], radian)
        
        )
      }
    }, {})
    let sortedAngelsKeys = Object.keys(visibleDegreeMap).map(Number).sort(sorter)
    let indexclosestTo90Deg = sortedAngelsKeys.reduce((acc, current, index) => {
      return Math.abs(current - - 90) <= Math.abs(sortedAngelsKeys[acc] - -90) ? index : acc
    }, 0)
    Array(indexclosestTo90Deg).fill('').forEach(_ => {
      sortedAngelsKeys.push(sortedAngelsKeys.shift())
    })

    let numericallySorted = sortedAngelsKeys.map(degree => {
      return [degree, visibleDegreeMap[degree.toString()] ]
    })
    let adjustedorderByAngle = [numericallySorted[0]]
    Array(numericallySorted.length-2).fill('').forEach(_ => {
      adjustedorderByAngle.push(numericallySorted.pop())
    })
    if(adjustedorderByAngle.length >= lastStep) {
      adjustedorderByAngle.length = lastStep;
      return adjustedorderByAngle[adjustedorderByAngle.length-1]

    } 
    else {

      let filteredCoords = allCoords.filter(coord => {
       return !adjustedorderByAngle.map(entry => entry[1].join('')).includes(coord.join(''))
      })
      return [...adjustedorderByAngle, ...this.handlePart2(filteredCoords, coordinateOfRotation, lastStep- final.length)]
    }

  }

  getAsteroideCoordinatesWithMostVisibility(input) {
    let asteroidMap = this.buildAsteroidViewMap(this.getCoordinatesOfAllAstroides(input))

    let asteroidMapByVisibility = Object.keys(asteroidMap).reduce((acc, origin) => ({
        ...acc,
        [origin]: asteroidMap[origin].length,
      }), {})
      return Object.entries(asteroidMapByVisibility).sort((a, b) =>
      {
        let value1 = a[1]
  
        let value2 = b[1]
        if (value1 < value2) {
          return 1
        } else if (value2 < value1) {
          return -1
        }
        return 0
      })[0]      
  }

};


module.exports = MonitoringStation