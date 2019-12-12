let AmplificationCircuit = require('./amplificationCircuit.js');

describe('Amplification Circuit', () => {
    describe('single pass', () => {
        it('example 1 should amplify the circuit', () => {
            let INPUT = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
            let maxSignal = [4,3,2,1,0]
                let actual = new AmplificationCircuit().getAmplifiedSignal(INPUT, maxSignal )
            expect(actual.solution).toEqual([43210])
        })
        
        it('example 2 should amplify the circuit', () => {
            let INPUT = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]

            let maxSignal = [0,1,2,3,4]
                let actual = new AmplificationCircuit().getAmplifiedSignal(INPUT, maxSignal )
            expect(actual.solution).toEqual([54321])
        })
        
        it('example 3 should amplify the circuit', () => {
            let INPUT = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]

            let maxSignal = [1,0,4,3,2]
            
                let actual = new AmplificationCircuit().getAmplifiedSignal(INPUT, maxSignal )
            expect(actual.solution).toEqual([65210])
        })
        
        it('part 1: get highest', () => {
            let INPUT = [3,8,1001,8,10,8,105,1,0,0,21,34,51,64,73,98,179,260,341,422,99999,3,9,102,4,9,9,1001,9,4,9,4,9,99,3,9,1001,9,4,9,1002,9,3,9,1001,9,5,9,4,9,99,3,9,101,5,9,9,102,5,9,9,4,9,99,3,9,101,5,9,9,4,9,99,3,9,1002,9,5,9,1001,9,3,9,102,2,9,9,101,5,9,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99]

            let phases = [0,1,2,3,4]
                let actual = new AmplificationCircuit().findHighestAmplifiedSignalForCombination([...INPUT], phases)
                expect(actual).toEqual(14902)
        })
    })

    describe('feedback Loop', () => {
           
        // it('example getAmplifiedSignalViaFeedbackLoop', () => {
        //     let INPUT = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]

        //     let maxSignal = [9,8,7,6,5]
            
        //         let actual = new AmplificationCircuit().getAmplifiedSignalViaFeedbackLoop(INPUT, maxSignal )
        //     expect(actual).toEqual(139629729)
        // })
    })
  })