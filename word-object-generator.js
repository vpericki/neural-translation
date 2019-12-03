function checkVowel(character) {
    if (character == 'a' ||
        character == 'e' ||
        character == 'i' ||
        character == 'o' ||
        character == 'u') {
        return true;
    } else return false;
}

function endsWithConsonant(word) {
    word = word.toLowerCase();
    
    if(checkVowel(word[word.length - 1])){
        return 0;
    } else return 1;
}

function percentageVowels(word) {
    word = word.toLowerCase();

    let counter = 0;

    for (let i = 0; i < word.length; i++) {
        if(checkVowel(word[i])){
            counter += 1;
        }
    }
    return counter / word.length;
}

function percentageConsonants(word){
    return 1 - percentageVowels(word);
}

function asciiSum(word){
    word = word.toLowerCase();
    let sum = 0;

    for(let i = 0; i < word.length; i++){
        sum += word.charCodeAt(i);
    }

    return sum;
}

function convertWordToData(word){

    let ends_with_consonant = endsWithConsonant(word);
    let percentage_vowels = percentageVowels(word);
    let percentage_consonants = percentageConsonants(word);
    let ascii_sum = asciiSum(word);

    let translation = 'lav';

    let object = {
        'ends_with_consonant': ends_with_consonant,
        'percentage_vowels': percentage_vowels,
        'percentage_consonants': percentage_consonants,
        'ascii_sum': ascii_sum,
        'length': word.length, 
        'species': word,
        'translation': translation
    }

    console.log(object);
}



convertWordToData('lav');
convertWordToData('lion');
