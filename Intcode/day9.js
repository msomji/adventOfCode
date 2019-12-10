// # 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
// # 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
// # 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
// # 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

// # 1 = +
// # 2 = *
// # 99 = stop

INPUT = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,91,67,225,1102,67,36,225,1102,21,90,225,2,13,48,224,101,-819,224,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1101,62,9,225,1,139,22,224,101,-166,224,224,4,224,1002,223,8,223,101,3,224,224,1,223,224,223,102,41,195,224,101,-2870,224,224,4,224,1002,223,8,223,101,1,224,224,1,224,223,223,1101,46,60,224,101,-106,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1001,191,32,224,101,-87,224,224,4,224,102,8,223,223,1001,224,1,224,1,223,224,223,1101,76,90,225,1101,15,58,225,1102,45,42,224,101,-1890,224,224,4,224,1002,223,8,223,1001,224,5,224,1,224,223,223,101,62,143,224,101,-77,224,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1101,55,54,225,1102,70,58,225,1002,17,80,224,101,-5360,224,224,4,224,102,8,223,223,1001,224,3,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1108,677,226,224,1002,223,2,223,1006,224,344,101,1,223,223,107,677,226,224,1002,223,2,223,1006,224,359,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,374,1001,223,1,223,108,226,677,224,1002,223,2,223,1006,224,389,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,404,1001,223,1,223,1108,677,677,224,1002,223,2,223,1005,224,419,101,1,223,223,1008,226,677,224,102,2,223,223,1006,224,434,101,1,223,223,107,226,226,224,102,2,223,223,1005,224,449,1001,223,1,223,1007,677,677,224,1002,223,2,223,1006,224,464,1001,223,1,223,1007,226,226,224,1002,223,2,223,1005,224,479,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,494,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,509,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,524,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,539,101,1,223,223,1107,677,226,224,1002,223,2,223,1006,224,554,101,1,223,223,1007,677,226,224,1002,223,2,223,1005,224,569,101,1,223,223,7,677,226,224,1002,223,2,223,1006,224,584,101,1,223,223,107,677,677,224,1002,223,2,223,1005,224,599,1001,223,1,223,8,226,677,224,1002,223,2,223,1005,224,614,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,629,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,644,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,659,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226]
INPUT2 = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,91,67,225,1102,67,36,225,1102,21,90,225,2,13,48,224,101,-819,224,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1101,62,9,225,1,139,22,224,101,-166,224,224,4,224,1002,223,8,223,101,3,224,224,1,223,224,223,102,41,195,224,101,-2870,224,224,4,224,1002,223,8,223,101,1,224,224,1,224,223,223,1101,46,60,224,101,-106,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1001,191,32,224,101,-87,224,224,4,224,102,8,223,223,1001,224,1,224,1,223,224,223,1101,76,90,225,1101,15,58,225,1102,45,42,224,101,-1890,224,224,4,224,1002,223,8,223,1001,224,5,224,1,224,223,223,101,62,143,224,101,-77,224,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1101,55,54,225,1102,70,58,225,1002,17,80,224,101,-5360,224,224,4,224,102,8,223,223,1001,224,3,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1108,677,226,224,1002,223,2,223,1006,224,344,101,1,223,223,107,677,226,224,1002,223,2,223,1006,224,359,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,374,1001,223,1,223,108,226,677,224,1002,223,2,223,1006,224,389,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,404,1001,223,1,223,1108,677,677,224,1002,223,2,223,1005,224,419,101,1,223,223,1008,226,677,224,102,2,223,223,1006,224,434,101,1,223,223,107,226,226,224,102,2,223,223,1005,224,449,1001,223,1,223,1007,677,677,224,1002,223,2,223,1006,224,464,1001,223,1,223,1007,226,226,224,1002,223,2,223,1005,224,479,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,494,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,509,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,524,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,539,101,1,223,223,1107,677,226,224,1002,223,2,223,1006,224,554,101,1,223,223,1007,677,226,224,1002,223,2,223,1005,224,569,101,1,223,223,7,677,226,224,1002,223,2,223,1006,224,584,101,1,223,223,107,677,677,224,1002,223,2,223,1005,224,599,1001,223,1,223,8,226,677,224,1002,223,2,223,1005,224,614,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,629,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,644,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,659,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226]
class Intcode {

    constructor(program, position = 0) {
        this.updatedProgram = program
        this.program = program
        this.position = position
        this.relativeBase = 0
        this.solution = []
    }

    process (phaseCode, phaseCodeApplied =false, initialInput =0 ) {
        this.phaseCode= phaseCode
        this.initialInput= initialInput
        this.phaseCodeApplied = phaseCodeApplied
        this.initialInputApplied = false
        this.continue = true
        while(this.continue) {
          this.code = "00000"+this.program[this.position]
          this.opcode = Number.parseInt(this.code[this.code.length -1])
          this.mode1 = Number.parseInt(this.code[this.code.length -3]) 
          this.mode2 = Number.parseInt(this.code[this.code.length -4]) 
          this.mode3 = Number.parseInt(this.code[this.code.length -5]) 
          
          if(this.mode1 === 0) { // position mode
            if(this.program[this.program[this.position +1]] === undefined) {
              // console.log('37')
              if(this.program[this.program[this.position +1]] == undefined)
              // console.log('38')
              this.program[this.program[this.position +1]] = 0
              // console.log(this.program)
            }
            this.param1 = Number.parseInt(this.program[this.program[this.position +1]])
            
          } else if((this.mode1 === 1)) { // immidiate mode
            // extendedMemory
            if(this.program[this.position +1] === undefined) {
              
              this.program[this.position +1] = 0
            }
            this.param1 = Number.parseInt(this.program[this.position +1])
            
          } else if(this.mode1 === 2) { // relative mode
            if(this.program[this.relativeBase + this.program[this.position +1]] === undefined) {
              // console.log('55')
              this.program[this.relativeBase + this.program[this.position +1]] = 0
            }
            this.param1
             = Number.parseInt(this.program[this.relativeBase + this.program[this.position +1]])
          }
          if(this.mode2 === 0) { // position mode
            // extendedMemory
            if(this.program[this.program[this.position+2]] === undefined) {
              // console.log('64')
              this.program[this.program[this.position+2]] = 0
            }
            this.param2 = Number.parseInt(this.program[this.program[this.position+2]])
          } else if(this.mode2 === 1) { // immidiate mode
            // extendedMemory
            if(this.program[this.position+2] === undefined) {
              // console.log('71')
              this.program[this.position+2] = 0
            }
            this.param2 = Number.parseInt(this.program[this.position+2])
          } else if(this.mode2 === 2) { // relative mode
            // extendedMemory
            // console.log(setting2)
            if(this.program[this.program[(this.relativeBase >= 0 ? this.relativeBase : 0) + this.position+2]] === undefined) {
              // console.log('79')
              this.program[this.program[(this.relativeBase >= 0 ? this.relativeBase : 0) + this.position+2]] = 0
            }
            this.param2 = Number.parseInt(this.program[this.relativeBase +this.program[ this.position+2]])
            
          }
          // console.log(this.program)
          
          
          // this.param2 = this.mode2 ==== 1 ? Number.parseInt(this.program[this.position+2]) : Number.parseInt(this.program[this.program[this.position+2]])
          
          if (this.opcode === 1){
            // console.log('hehrer')
            this.program[this.program[this.position + 3]] = this.param1 + this.param2
            this.updatedProgram = [...this.program]
            this.position+=4
            
          }
          else if (this.opcode === 2) {
            // console.log('hehrer')
            this.program[this.program[this.position +3]] = this.param1 * this.param2
            
            this.updatedProgram = [...this.program]
            this.position+=4
            
          }
          else if( this.opcode === 3) {
            if(this.phaseCodeApplied) {
              this.value = this.initialInput
              this.initialInputApplied = true
            } else {
              this.value =  this.phaseCode
              this.phaseCodeApplied = true
            }
            this.program[this.program[this.position+1]] = this.value
            this.updatedProgram = [...this.program]
            this.position+=2
          }
          else if(this.opcode === 4) {
            this.solution.push(this.param1)
            this.position+=2
          }
          else if(this.opcode === 5) {
            this.position = (this.param1 != 0 )? this.param2 : this.position+=3
            this.updatedProgram = [...this.program]
          }
          else if(this.opcode === 6) {
            this.position = (this.param1 === 0)? this.param2 : this.position+=3
            this.updatedProgram = [...this.program]
          }
          else if(this.opcode === 7) {
            this.program[this.program[this.position + 3]]  =  (this.param1 < this.param2 )? 1 :  0
            this.updatedProgram = [...this.program]
            this.position+=4
          }
          else if(this.opcode === 8) {
            this.program[this.program[this.position + 3]] =  (this.param1 === this.param2) ? 1 : 0
            this.updatedProgram = [...this.program]
            this.position+=4
          }
          else if(this.opcode === 9) {
            this.relativeBase = this.relativeBase + this.param1
            // console.log(this.relativeBase)
            this.position+=2 // not sure if this is correct
          }
          else {
            this.continue = false
            break;
          }
        }
        
        return {
            program: this.updatedProgram,
            solution: this.solution,
            pointer: this.position,
            isDone: !this.continue

        }
    }
}

module.exports = Intcode
// INPUT = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]
// subject = new Intcode([...INPUT]).process(8)
// console.log(subject.solution)