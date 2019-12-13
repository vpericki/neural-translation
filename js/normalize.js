let fs = require('fs');
let dataJson = JSON.parse(fs.readFileSync('json/data.json', 'utf8')).data;
let testingJson = JSON.parse(fs.readFileSync('json/testing-data.json', 'utf-8'));

module.exports = {
    loadTrainingData: function(tf){
        const trainingData = tf.tensor2d(dataJson.map(
            animal => [
                animal.ends_with_consonant,
                animal.percentage_vowels,
                animal.percentage_consonants,
                animal.letter_avg_weight,
                animal.first_letter_weight,
                animal.last_letter_weight,
                animal.length
            ]
        ));

        return trainingData;
    },
    loadOutputData: function(tf){
        const outputData = tf.tensor2d(dataJson.map(
            animal => [
                animal.translation == 'tigar' ? 1 : 0,
                animal.translation == 'lav' ? 1 : 0,
                animal.translation == 'kornjaca' ? 1 : 0,
                animal.translation == 'zirafa' ? 1 : 0,
                animal.translation == 'polarni medvjed' ? 1 : 0,
                animal.translation == 'pingvin' ? 1 : 0,
                animal.translation == 'slon' ? 1 : 0,
        
        
            ]
        ));

        return outputData;
    },
    loadTestingData: function(){
        return testingJson;
    }
}