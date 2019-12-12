let Intcode = require("./intcode.js");
var Combinatorics = require("js-combinatorics");
class AmplificationCircuit {
  getAmplifiedSignal(program, phases) {
    return phases.reduce(
      (state, phase) => {
        return new Intcode(program).process([
          ...state.solution,
          phase
        ]);
        },
      { program, solution: [0] }
    );
  }

  sorter = (a, b) => {
    if (a > b) {
      return -1;
    } else if (b > a) {
      return 1;
    } else {
      return 0;
    }
  };

  findHighestAmplifiedSignalForCombination(program, phases) {
    let combinationGenerator = Combinatorics.permutation(phases);
    let currentPhaseCombination = combinationGenerator.next();
    let solutions = [];

    while (!!currentPhaseCombination) {
      let run = this.getAmplifiedSignal(program, currentPhaseCombination);
      solutions.push(...run.solution);
      currentPhaseCombination = combinationGenerator.next();
    }
    return solutions.sort(this.sorter)[0];
  }

  feedbackState(program) {
    return  {
        position: 0,
        program,
        solution: [0]
    }
  }

  
  getAmplifiedSignalViaFeedbackLoop(program, phases) {
    let globalState = {
        5: {
          position: 0,
          program,
          solution: [0]
      },
        6: {
          position: 0,
          program,
          solution: [0]
      },
        7: {
          position: 0,
          program,
          solution: [0]
      },
        8: {
          position: 0,
          program,
          solution: [0]
      },
        9: {
          position: 0,
          program,
          solution: [0]
      },
    }
    let isDone = false
    while (!isDone) {

        phases.reduce(
          (state, phase) => {
              let currentRun = new Intcode(globalState[phase].program, globalState[phase].position).process([
                ...globalState[phase].solution,
                phase
              ])
              if(currentRun.halted) {
                this.isDone = true
              }
              this.globalState = {
                  ...this.globalState,
                  [phase]: currentRun,
              }
            return {
                solution: currentRun.solution
            };
          },{});
    }
  }

}

module.exports = AmplificationCircuit;
