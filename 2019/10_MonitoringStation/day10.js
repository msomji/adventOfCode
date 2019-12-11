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