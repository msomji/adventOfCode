const fs = require('fs');


 fs.readFile('./input.txt', (err, data) => { 
    if (err) throw err; 
  // let trial = ["-6", "+3", "+8", "+5", "-6"]
  // let trial = ["+7", "+7", "-2", "-7", "-4"]
  let trial = data.toString().split('\n').map(Number)
  // let trial = ["+1", "-1"]
    //  let sum = new FrequencyCalculator().total(data.toString().split('\n').map(Number));
     let sum = new FrequencyCalculator().total([
       ...trial.map(Number),

     ]);
     console.log(sum.firstTwice)

  }) 

  class FrequencyCalculator {
  
    total(frequencies) {
      return frequencies.reduce((acc, freq) => {
        let newFrequency =acc.sum + freq
        // console.log(acc.frequencies)
        if (!!acc.firstTwice) {
          return acc
        }
        return {
          ...acc,
          sum: newFrequency,
          frequencies: [...acc.frequencies, newFrequency],
          firstTwice: acc.frequencies.includes(newFrequency) && acc.firstTwice == undefined? newFrequency: acc.firstTwice
        }
      }, {
        sum: 0,
        frequencies: [0],
        firstTwice: undefined
      })
    }
  }