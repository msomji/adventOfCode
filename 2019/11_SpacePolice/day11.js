const Intcode = require('./intcode');

const WHITE = 1;
const BLACK = 0
const TURN_RIGHT = 1
class SpacePolice {
    constructor(input) {
        this.program = input
        this.paintedCoords = {

        }
    }
    updateDirection(currentDirection, directionCode) {
        switch (currentDirection) {
            case '^':
                return directionCode == TURN_RIGHT ? '>': '<'
            case '<':
                return directionCode == TURN_RIGHT ? '^': 'v'
            case '>':
                return directionCode == TURN_RIGHT ? 'v': '^'
            case 'v':
                return directionCode == TURN_RIGHT ? '<': '>'
            default:
                throw('bug!')
        }
    }
    move(currentLocation, direction) {
        switch (direction) {
            case '^':
                return [currentLocation[0], currentLocation[1]+1]
            case '<':
                return [currentLocation[0]-1, currentLocation[1]]
            case '>':
                return [currentLocation[0]+1, currentLocation[1]]
            case 'v':
                return [currentLocation[0], currentLocation[1]-1]
            default:
                throw('bug!')
        }
    }
    paint(initial = BLACK) {
        this.paintedCoords = {
            '0,0': initial
        };
        let currentDirection = '^';
        let currentProgram = this.program;
        let location = [0,0]
        let nextInput = initial
        let run = new Intcode(currentProgram).process().next(nextInput)
        while(run.next !== undefined) {
        
            const [newColor, nextRotation] = run.solution
                    this.paintedCoords = {
                        ...this.paintedCoords,
                        [location]: newColor
                    }

            currentDirection = this.updateDirection(currentDirection, nextRotation)
            location = this.move(location, currentDirection)

            nextInput = this.paintedCoords[location.join(',')] || BLACK
            run = run.next(nextInput)
        }
    }

    draw() {
        const xCoords = Object.entries(this.paintedCoords).map(coord => +coord[0].split(',')[0]);
        const yCoords = Object.entries(this.paintedCoords).map(coord => +coord[0].split(',')[1]);

        const maxX = Math.max(...xCoords);
        const minX = Math.min(...xCoords);
        const maxY = Math.max(...yCoords);
        const minY = Math.min(...yCoords);

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
            const currentColor = this.paintedCoords[[x,y].join(',')] || BLACK;

            if (currentColor === BLACK) {
            process.stdout.write(' ');
            } else {
            process.stdout.write('#');
            }
        }
        console.log();
        }

    }
}


let INPUT = [3,8,1005,8,328,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,28,1006,0,13,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,54,1,1103,9,10,1006,0,97,2,1003,0,10,1,105,6,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,91,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,113,2,109,5,10,1006,0,96,1,2,5,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,146,2,103,2,10,1006,0,69,2,9,8,10,1006,0,25,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,182,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,203,2,5,9,10,1006,0,0,2,6,2,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,1002,8,1,236,2,4,0,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1002,8,1,263,2,105,9,10,1,103,15,10,1,4,4,10,2,109,7,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,301,1006,0,63,2,105,6,10,101,1,9,9,1007,9,1018,10,1005,10,15,99,109,650,104,0,104,1,21102,387508441116,1,1,21102,1,345,0,1106,0,449,21102,1,387353256852,1,21102,1,356,0,1105,1,449,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,179410308315,0,1,21102,1,403,0,1106,0,449,21101,206199495827,0,1,21102,414,1,0,1105,1,449,3,10,104,0,104,0,3,10,104,0,104,0,21102,718086758760,1,1,21102,1,437,0,1105,1,449,21101,838429573908,0,1,21102,448,1,0,1106,0,449,99,109,2,21202,-1,1,1,21102,1,40,2,21102,480,1,3,21101,470,0,0,1105,1,513,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,475,476,491,4,0,1001,475,1,475,108,4,475,10,1006,10,507,1102,0,1,475,109,-2,2106,0,0,0,109,4,2101,0,-1,512,1207,-3,0,10,1006,10,530,21101,0,0,-3,21202,-3,1,1,21201,-2,0,2,21102,1,1,3,21102,549,1,0,1105,1,554,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,577,2207,-4,-2,10,1006,10,577,22102,1,-4,-4,1106,0,645,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21101,596,0,0,1106,0,554,22101,0,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,615,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,637,21201,-1,0,1,21101,637,0,0,106,0,512,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0]


let path= new SpacePolice(INPUT)
path.paint(WHITE)
path.draw()
console.log()
