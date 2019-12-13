function checkVowel(character) {
    if (character == 'a' ||
        character == 'e' ||
        character == 'i' ||
        character == 'o' ||
        character == 'u') {
        return true;
    } else return false;
}

function startsWithConsonant(word) {
    if (checkVowel(word[0])) {
        return 0;
    } else return 1;
}

function endsWithConsonant(word) {
    if (checkVowel(word[word.length - 1])) {
        return 0;
    } else return 1;
}

function percentageVowels(word) {
    let counter = 0;

    for (let i = 0; i < word.length; i++) {
        if (checkVowel(word[i])) {
            counter += 1;
        }
    }
    return counter / word.length;
}

function percentageConsonants(word) {
    return 1 - percentageVowels(word);
}

function letterAvgWeight(word) {
    let avgWeight = 0.0;

    for (let i = 0; i < word.length; i++) {


        avgWeight += (word.charCodeAt(i) - 'a'.charCodeAt(0)) / ('z'.charCodeAt(0) - 'a'.charCodeAt(0));

    }
    return avgWeight /= word.length;
}

function firstLetterWeight(word) {
    return (word.charCodeAt(0) - 'a'.charCodeAt(0)) / ('z'.charCodeAt(0) - 'a'.charCodeAt(0));

}

function lastLetterWeight(word) {
    return (word.charCodeAt(word.length - 1) - 'a'.charCodeAt(0)) / ('z'.charCodeAt(0) - 'a'.charCodeAt(0));
}


function convertWordToData(word, translation, setWrite) {

    let fs = require('fs');

    word = word.toLowerCase();

    let starts_with_consonant = startsWithConsonant(word);
    let ends_with_consonant = endsWithConsonant(word);
    let percentage_vowels = percentageVowels(word);
    let percentage_consonants = percentageConsonants(word);

    let avg_letter_weight = letterAvgWeight(word);
    let first_letter_weight = firstLetterWeight(word);
    let last_letter_weight = lastLetterWeight(word);


    let object = {
        'starts_with_consonant': starts_with_consonant,
        'ends_with_consonant': ends_with_consonant,
        'percentage_vowels': percentage_vowels,
        'percentage_consonants': percentage_consonants,
        'letter_avg_weight': avg_letter_weight,
        'first_letter_weight': first_letter_weight,
        'last_letter_weight': last_letter_weight,
        'length': word.length,
        'species': word,
        'translation': translation,

    };

    console.log(JSON.stringify(object));

    if (setWrite === true) {

        let path = '../json/data.json';

        let dataJson = JSON.parse(fs.readFileSync(path, 'utf8'));
        dataJson.data.push(object);
        dataJson = JSON.stringify(dataJson);

        fs.writeFile(path, dataJson, 'utf8', function (err) {
            if (err) throw err;

            console.log("Written!");
        });
    }

}



//convertWordToData('girafa', 'zirafa', false);


module.exports = {
    generateSingleTestingWord: function (word) {
        word = word.toLowerCase();

        let starts_with_consonant = startsWithConsonant(word);
        let ends_with_consonant = endsWithConsonant(word);
        let percentage_vowels = percentageVowels(word);
        let percentage_consonants = percentageConsonants(word);

        let avg_letter_weight = letterAvgWeight(word);
        let first_letter_weight = firstLetterWeight(word);
        let last_letter_weight = lastLetterWeight(word);


        let object = {
            'starts_with_consonant': starts_with_consonant,
            'ends_with_consonant': ends_with_consonant,
            'percentage_vowels': percentage_vowels,
            'percentage_consonants': percentage_consonants,
            'letter_avg_weight': avg_letter_weight,
            'first_letter_weight': first_letter_weight,
            'last_letter_weight': last_letter_weight,
            'length': word.length,
        };


        return object;
    }
}