function fetchResult() {

    let word = document.getElementById('word').value;

    if (word.length != 0 && word != '' && word != undefined) {

        let wordResult = document.getElementById('wordResult');
        wordResult.innerHTML = 'Loading please wait...';

        fetch(`/requestPredict?word='${word}'`)
            .then(response => response.json())
            .then(data => {

                let background = document.getElementById('background');

                wordResult.innerHTML = data.prediction;
                if (data.hasImage) {
                    background.style.background = `url(${data.imageUrl}) no-repeat center`;
                } else {
                    background.style.background = `#333333 no-repeat center center fixed`;

                }
            });

    }


}

