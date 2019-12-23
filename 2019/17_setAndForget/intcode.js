class Intcode {
    constructor(program, position=0, relativeBase=0) {
        this.program = program
        this.position = position
        this.solution = []
        this.relativeBase = relativeBase
    }

    accessMemory(program, position) {
        return program[position] || 0
    }

    getValueOfParam(mode, program, position) {
        switch (mode) {
            case 0:
                return this.accessMemory(program, this.accessMemory(program, position));
            case 1:
                return this.accessMemory(program, position);
            case 2:
                return this.accessMemory(program, this.accessMemory(program, position) + this.relativeBase);
        }
    };

    positionToSetAt(mode, program, position) {
        switch (mode) {
            case 0:
                return this.accessMemory(program, position);
            case 1:
                return this.accessMemory(program, position);
            case 2:
                return this.accessMemory(program, position) + this.relativeBase;
        }
    };

    process() {
        let halted = false;

        while (!halted) {
            let code = "0000000000000000" + this.program[this.position]
            let opcode = Number.parseInt(code.slice(-2))
            let param1Mode = Number.parseInt(code.slice(-3,-2))
            let param2Mode = Number.parseInt(code.slice(-4,-3))
            let param3Mode = Number.parseInt(code.slice(-5,-4))

            let param1Value = this.getValueOfParam(param1Mode, this.program, this.position + 1);
            let param1Address = this.positionToSetAt(param1Mode, this.program, this.position + 1);
        
            let param2Value = this.getValueOfParam(param2Mode, this.program, this.position + 2);
            let param2Address = this.positionToSetAt(param2Mode, this.program, this.position + 2);

            let param3Value = this.getValueOfParam(param3Mode, this.program, this.position + 3);
            let param3Address = this.positionToSetAt(param3Mode, this.program, this.position + 3);
            switch (opcode) {
                case 1:
                    this.program[param3Address] = param1Value + param2Value
                    this.position+=4
                    break;
                case 2: 
                    this.program[param3Address] = param1Value * param2Value
                    this.position+=4
                    break;
                case 3: 
                return {
                    next: nextInput => {
                            let updatedProgram = [
                                ...this.program
                            ]
                            updatedProgram[param1Address] = nextInput
                            return new Intcode(updatedProgram, this.position+2, this.relativeBase).process()
                        },
                        solution: this.solution,
                    }
                case 4: 
                    this.solution.push(param1Value);
                    this.position+=2
                    break;
                case 5: //jump if true
                    if(param1Value !== 0) {
                        this.position = param2Value
                    } else {
                        this.position+=3
                    }
                    break;
                case 6: // jump if false
                    if(param1Value == 0) {
                        this.position = param2Value
                    } else {
                        this.position+=3
                    }
                    break;
                case 7: 
                    this.program[param3Address] = (param1Value < param2Value) ? 1: 0
                    this.position+=4
                    break;
                case 8: 
                    this.program[param3Address]  = (param1Value === param2Value) ? 1: 0
                    this.position+=4
                    break;
                case 9: 
                    this.relativeBase += param1Value
                    this.position+=2
                    break;
                case 99: 
                halted = true
                break
            }
        }
        return {
            program: this.program,
            solution: this.solution,
            position: this.position,
            halted: halted
        }
    }
}

module.exports = Intcode;