let MonitoringStation = require('./day10.js');


describe('Monitoring Station', () =>
{
  it('should get all the coordinates', () =>
  {
    let INPUT = [
      [".", ".", ".", "."],
      [".", "#", ".", "."],
      [".", ".", "#", "."],
      ["#", ".", "", "."],
    ]
    let coords = new MonitoringStation().getCoordinatesOfAllAstroides(INPUT)
    expect(coords).toEqual([[1, 1], [2, 2], [0, 3]])
  })

  it('should get quadrent 1 and slope of line', () =>
  {
    let actual = new MonitoringStation().getAngleBetweenTwoPointsInRadians([1, 1], [9, 5])

    expect(actual).toEqual(0.4636476090008061)
  })
  it('should get quadrent 2 and slope of line', () =>
  {
    let actual = new MonitoringStation().getAngleBetweenTwoPointsInRadians([0, 0], [-9, 5])

    expect(actual).toEqual(2.6344941491974563)
  })
  it('should get quadrent 3  and slope of line', () =>
  {
    let actual = new MonitoringStation().getAngleBetweenTwoPointsInRadians([1, 1], [-9, -5])

    expect(actual).toEqual(-2.601173153319209)
  })
  it('should get quadrent 4 and slope of line', () =>
  {
    let actual = new MonitoringStation().getAngleBetweenTwoPointsInRadians([1, 1], [9, -5])

    expect(actual).toEqual(-0.6435011087932844)
  })

  it('should get slop of all asteroids in relation to', () =>
  {
    let actual = new MonitoringStation().getAngleInRadiansFromOrigin([1, 1], [[9, 5]])

    expect(actual).toEqual([ 0.4636476090008061 ])
  })
  it('shouldbuildMapOfAsteroidsWithRelated Slops', () =>
  {
    let actual = new MonitoringStation().buildAsteroidViewMap([[1, 1], [2, 2], [0, 3]])

    let result = { '1,1': [ 0, 0.7853981633974483, 2.0344439357957027 ],
                    '2,2': [ -2.356194490192345, 0, 2.677945044588987 ],
                    '0,3': [ -1.1071487177940904, -0.4636476090008061, 0 ] }

    expect(actual).toEqual(result)
  })
  it('example 1', () =>
  {
    INPUT = [
      "......#.#.".split(""),
      "#..#.#....".split(""),
      "..#######.".split(""),
      ".#.#.###..".split(""),
      ".#..#.....".split(""),
      "..#....#.#".split(""),
      "#..#....#.".split(""),
      ".##.#..###".split(""),
      "##...#..#.".split(""),
      ".#....####".split("")
    ]
    let result = new MonitoringStation().getAsteroideCoordinatesWithMostVisibility(INPUT);

    expect(result).toEqual([ '5,8', 33 ])
  })
  it('example 2', () =>
  {
    INPUT = [
      "#.#...#.#.".split(""),
      ".###....#.".split(""),
      ".#....#...".split(""),
      "##.#.#.#.#".split(""),
      "....#.#.#.".split(""),
      ".##..###.#".split(""),
      "..#...##..".split(""),
      "..##....##".split(""),
      "......#...".split(""),
      ".####.###.".split(""),
    ]
    let result = new MonitoringStation().getAsteroideCoordinatesWithMostVisibility(INPUT);
    expect(result).toEqual([ '1,2', 35 ])
  })
  it('example 3', () =>
  {
    INPUT = [
      ".#..#..###".split(""),
      "####.###.#".split(""),
      "....###.#.".split(""),
      "..###.##.#".split(""),
      "##.##.#.#.".split(""),
      "....###..#".split(""),
      "..#.#..#.#".split(""),
      "#..#.#.###".split(""),
      ".##...##.#".split(""),
      ".....#.#..".split(""),
    ]
    let result = new MonitoringStation().getAsteroideCoordinatesWithMostVisibility(INPUT);

   
    expect(result).toEqual([ '6,3', 41 ])
  })
  it('example 4', () =>
  {
    INPUT = [
      ".#..##.###...#######".split(""),
      "##.############..##.".split(""),
      ".#.######.########.#".split(""),
      ".###.#######.####.#.".split(""),
      "#####.##.#.##.###.##".split(""),
      "..#####..#.#########".split(""),
      "####################".split(""),
      "#.####....###.#.#.##".split(""),
      "##.#################".split(""),
      "#####.##.###..####..".split(""),
      "..######..##.#######".split(""),
      "####.##.####...##..#".split(""),
      ".#####..#.######.###".split(""),
      "##...#.##########...".split(""),
      "#.##########.#######".split(""),
      ".####.#.###.###.#.##".split(""),
      "....##.##.###..#####".split(""),
      ".#.#.###########.###".split(""),
      "#.#.#.#####.####.###".split(""),
      "###.##.####.##.#..##".split(""),
    ]
    let result = new MonitoringStation().getAsteroideCoordinatesWithMostVisibility(INPUT);
    expect(result).toEqual([ '11,13', 210 ])
  
  })
  it('part 1 solution', () =>
  {
    INPUT = [
      "#..#....#...#.#..#.......##.#.####".split(""),
      "#......#..#.#..####.....#..#...##.".split(""),
      ".##.......#..#.#....#.#..#.#....#.".split(""),
      "###..#.....###.#....##.....#...#..".split(""),
      "...#.##..#.###.......#....#....###".split(""),
      ".####...##...........##..#..#.##..".split(""),
      "..#...#.#.#.###....#.#...##.....#.".split(""),
      "......#.....#..#...##.#..##.#..###".split(""),
      "...###.#....#..##.#.#.#....#...###".split(""),
      "..#.###.####..###.#.##..#.##.###..".split(""),
      "...##...#.#..##.#............##.##".split(""),
      "....#.##.##.##..#......##.........".split(""),
      ".#..#.#..#.##......##...#.#.#...##".split(""),
      ".##.....#.#.##...#.#.#...#..###...".split(""),
      "#.#.#..##......#...#...#.......#..".split(""),
      "#.......#..#####.###.#..#..#.#.#..".split(""),
      ".#......##......##...#..#..#..###.".split(""),
      "#.#...#..#....##.#....#.##.#....#.".split(""),
      "....#..#....##..#...##..#..#.#.##.".split(""),
      "#.#.#.#.##.#.#..###.......#....###".split(""),
      "...#.#..##....###.####.#..#.#..#..".split(""),
      "#....##..#...##.#.#.........##.#..".split(""),
      ".#....#.#...#.#.........#..#......".split(""),
      "...#..###...#...#.#.#...#.#..##.##".split(""),
      ".####.##.#..#.#.#.#...#.##......#.".split(""),
      ".##....##..#.#.#.......#.....####.".split(""),
      "#.##.##....#...#..#.#..###..#.###.".split(""),
      "...###.#..#.....#.#.#.#....#....#.".split(""),
      "......#...#.........##....#....##.".split(""),
      ".....#.....#..#.##.#.###.#..##....".split(""),
      ".#.....#.#.....#####.....##..#....".split(""),
      ".####.##...#.......####..#....##..".split(""),
      ".#.#.......#......#.##..##.#.#..##".split(""),
      "......##.....##...##.##...##......".split(""),
    ]
    let result = new MonitoringStation().getAsteroideCoordinatesWithMostVisibility(INPUT);

    expect(result).toEqual([ '23,20', 334 ])
  })

  describe('part 2: Rotating Lazers', () => {
    it('get 200th thing to be vanished', () => {
    })
  })

})