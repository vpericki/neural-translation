let tf = require('@tensorflow/tfjs-node');
let fs = require('fs');

let model = require('./js/model').createModel(tf);
let data = require('./js/normalize');
let denormalize = require('./js/denormalize');

const trainingData = data.loadTrainingData(tf);
const outputData = data.loadOutputData(tf);
const testingData = data.loadTestingData();

// Training the model
console.log(testingData[0]);

let startTime = new Date();
model.fit(trainingData, outputData, { epochs: 1000 })
    .then((history) => {
        fs.writeFile('json/history.json', JSON.stringify(history), 'utf8', function(err){
            if(err) throw err;
    
            console.log("Written history!");
        });

        
        // Denormalization

        for(let i = 0; i < testingData.length; i++){

            let objectArray = [];
            objectArray.push(testingData[i]);

            const testing = tf.tensor2d(objectArray.map(
                animal => [
                    animal.ends_with_consonant,
                    animal.percentage_vowels,
                    animal.percentage_consonants,
                    animal.letter_avg_weight,
                    animal.first_letter_weight,
                    animal.last_letter_weight,
                    animal.length
                ]));

            let prediction = model.predict(testing);
            prediction.print();
            let data = prediction.dataSync();
            let possibleAnimals = ['tigar', 'lav', 'kornjaca', 'zirafa', 'polarni medvjed', 'pingvin', 'slon'];
    
            console.log(denormalize.denormalizePrediction(data, possibleAnimals));
        }

       
        
        let endTime = new Date();
        console.log('Total time taken: ' + (endTime - startTime) / 1000 + "s");










        // Saving trained model
        /* 
        try{
            model.save('file://./static/trained');
        } catch(err){
            throw err;
        }
        */

    });




