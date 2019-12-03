let tf = require('@tensorflow/tfjs');
let fs = require('fs');

let dataJson = JSON.parse(fs.readFileSync('data.json', 'utf8'));
let testingJson = JSON.parse(fs.readFileSync('testing-data.json', 'utf-8'));

const trainingData = tf.tensor2d(dataJson.map(
    animal => [
        animal.ends_with_consonant,
        animal.percentage_vowels,
        animal.percentage_consonants,
        animal.ascii_sum,
        animal.length
    ]
));


const outputData = tf.tensor2d(dataJson.map(
    animal => [
        animal.translation == 'tigar' ? 1 : 0,
        animal.translation == 'lav' ? 1 : 0,
    ]
));



const testingData = tf.tensor2d(testingJson.map(
    animal => [
        animal.ends_with_consonant,
        animal.percentage_vowels,
        animal.percentage_consonants,
        animal.ascii_sum,
        animal.length
    ]
));


const model = tf.sequential();

model.add(tf.layers.dense({
    inputShape: [5],
    activation: "sigmoid",
    units: 7
}));

model.add(tf.layers.dense({
    inputShape: [7],
    activation: "relu",
    units: 2
}));

model.add(tf.layers.dense({
    activation: "sigmoid",
    units: 2
}));

model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(0.06)
});

model.fit(trainingData, outputData, { epochs: 10000 })
    .then((history) => {
        model.predict(testingData).print();
    });




