

class Intcode {
    constructor(program, position=0) {
        this.program = program
        this.position = position
        this.solution = []
        this.relativeBase = 0
    }
    getImmidiateMode(program, position) {
        return program[position] || 0
    }
    
    getPositionMode(program, position) {
        return program[(program[position] || 0)] || 0
    }

    getParamFromMode(mode, program, position, relativeBase) {
        switch(mode) {
            case 0: // position mode
                return this.getPositionMode(program, position)
            case 1: // immidiate mode
                return this.getImmidiateMode(program, position)
            case 2: //relative mode
                return program[(program[position] || 0)+ relativeBase ] ||0
        }

    }

    process(input = 1) {
        let halted = false;
        while (!halted) {
            let code = "0000000000000000" + this.program[this.position]
            let opcode = Number.parseInt(code.slice(-2))
            let param1Mode = Number.parseInt(code.slice(-3,-2))
            let param2Mode = Number.parseInt(code.slice(-4,-3))
            let param3Mode = Number.parseInt(code.slice(-5,-4))

            let param1 = this.getParamFromMode(param1Mode, this.program, this.position+1, this.relativeBase) || 0
            let param2 = this.getParamFromMode(param2Mode, this.program, this.position+2, this.relativeBase) || 0
            let param3 = this.getParamFromMode(param3Mode, this.program, this.position+3, this.relativeBase) || 0

           
           
           
           
            switch (opcode) {
                case 1:
                    this.program[this.getImmidiateMode(this.program, this.position+3)] = param1 + param2
                    this.position+=4
                    break;
                case 2: 
                    this.program[this.getImmidiateMode(this.program, this.position+3)] = param1 * param2
                    this.position+=4
                    break;
                case 3: 
                    this.program[this.getImmidiateMode(this.program, this.position+1)] = input
                    this.position+=2
                    break;
                case 4: 
                    this.solution.push(param1);
                    this.position+=2
                    break;
                case 5: //jump if true
                    if(param1 !== 0) {
                        this.position = param2
                    } else {
                        this.position+=3
                    }
                    break;
                case 6: // jump if false
                    if(param1 == 0) {
                        this.position = param2
                    } else {
                        this.position+=3
                    }
                    break;
                case 7: 
                    this.program[this.getImmidiateMode(this.program, this.position+3)] = (param1 < param2) ? 1: 0
                    this.position+=4
                    break;
                case 8: 
                    this.program[this.getImmidiateMode(this.program, this.position+3)]  = (param1 === param2) ? 1: 0
                    this.position+=4
                    break;
                case 9: 
                    this.relativeBase += this.param1
                    this.position+=2
                    break;
                case 99: 
                    halted = true
                    break
            }
        }
        return {
            program: this.program,
            solution: this.solution
        }
    }
}

// INPUT = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]
// subject = new Intcode(INPUT).process(8)
// console.log(subject.solution)
module.exports = Intcode;