module.exports = {
    createModel: function(tf){

        const model = tf.sequential();

        model.add(tf.layers.dense({
            inputShape: [7],
            activation: "sigmoid",
            units: 14
        }));

        model.add(tf.layers.dense({
            inputShape: [14],
            activation: "sigmoid",
            units: 7,
            useBias: true,
            biasInitializer: 'glorotUniform'
        }));

        model.add(tf.layers.dense({
            activation: "sigmoid",
            units: 7,
            useBias: true,
            biasInitializer: 'glorotUniform'
        }));

        model.compile({
            loss: "meanSquaredError",
            optimizer: tf.train.adamax(0.06, 0.1)
        });

        return model;

    }
}