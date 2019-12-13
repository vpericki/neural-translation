let express = require('express');
let app = express();
let tf = require('@tensorflow/tfjs-node');
let denormalize = require('./js/denormalize');
let cors = require('cors');
let request = require('request');
let translate = require('@vitalets/google-translate-api');
let testingWordGenerator = require('./js/word-object-generator');
let syncPromise = require('synchronous-promise');

let port = process.env.PORT || 8000;


app.use(express.static('./static'));
app.use(cors());

async function predict(wordObject) {

    loadedModel = await tf.loadLayersModel('https://neural-zoo.herokuapp.com/trained/model.json');

    let array = [];
    array.push(wordObject);
    let prediction = loadedModel.predict(
        tf.tensor2d(array.map(animal =>
            [
                animal.ends_with_consonant,
                animal.percentage_vowels,
                animal.percentage_consonants,
                animal.letter_avg_weight,
                animal.first_letter_weight,
                animal.last_letter_weight,
                animal.length
            ]
        ))
    );


    let possibleAnimals = ['tigar', 'lav', 'kornjaca', 'zirafa', 'polarni medvjed', 'pingvin', 'slon'];
    let response = {};
    response['word'] = denormalize.denormalizePrediction(prediction.dataSync(), possibleAnimals);

    return response;
}


app.get('/requestPredict', (req, res) => {

    let word = req.query.word.slice(1, req.query.word.length - 1);

    if (word != '' || word != undefined) {

        let outputObject = {};

        syncPromise.SynchronousPromise.resolve(predict(testingWordGenerator.generateSingleTestingWord(word))).then(data => {

            let wordToTranslate = data.word[0];
            outputObject['prediction'] = data.word[0];
            

            syncPromise.SynchronousPromise.all([translate(wordToTranslate, {from: 'hr', to: 'en'})]).then(results => {
    
                let search = results[0].text;
                let apiKey = '7837287-2b836fb0bfed0c14b010d7a1c';
                let url = "https://pixabay.com/api/?key=" + apiKey + "&q=";
    
                request(url + search, function(err, response, body){
                    body = JSON.parse(body);
                    let totalHits = body.totalHits;
    
                    if(totalHits == 0){
                        outputObject['hasImage'] = false;
                        res.end(JSON.stringify(outputObject));
                    }
                    else{
                        let randomNumber = 1;
                        if(totalHits < 20){
                            randomNumber = Math.floor(Math.random() * totalHits);
                        } else{
                            randomNumber = Math.floor(Math.random() * 20);
                        }
                        outputObject['hasImage'] = true;
                        outputObject['imageUrl'] = body.hits[randomNumber].largeImageURL;
    
                        res.end(JSON.stringify(outputObject));
                    }
    
    
                });
    
            });
        });

       

    }
    
    else{
        res.end(JSON.stringify({error: 1}));
    }
    
});

let server = app.listen(port, function () {

    let host = server.address().address;
    let port = server.address().port;




    console.log('Express app listening at http://%s:%s', host, port);

});