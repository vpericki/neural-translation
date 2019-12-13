module.exports = {
    denormalizePrediction: function (data, possibleAnimals) {
        let maxIndex = 0;
        let maxValue = 0;

        let normalized = [];

        for (let j = 0; j < possibleAnimals.length; j++) {

            let localMax = data[j];

            if (localMax > maxValue) {
                maxValue = localMax;
                maxIndex = j;
            }
        }

        normalized.push(possibleAnimals[maxIndex]);
        return normalized;
    }
}