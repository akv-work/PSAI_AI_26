const dataset = [
    { x1: 1,  x2: 4,  label: 0 },
    { x1: -1, x2: 4,  label: 0 },
    { x1: 1,  x2: -4, label: 0 },
    { x1: -1, x2: -4, label: 1 }
];

class Perceptron{
    constructor(learning_rate = 0.1){
        this.w1 = Math.random() - 0.5;
        this.w2 = Math.random() - 0.5;
        this.bias = Math.random() - 0.5;
    }

    activate(sum){
        return sum >= 0 ? 1 : 0;
    }
    
    train(dataset = [{}]){
        let errorSum = 0;
        dataset.forEach(vector => {
            let sum = 0;
            sum += vector.x1 * this.w1 + vector.x2 * this.w2 + this.bias; 

            let prediction = this.activate(sum);
            let error = vector.label - prediction;

            if(error!=0){
                this.w1 = this.w1 + 0.1*error*vector.x1;
                this.w2 = this.w2 + 0.1*error*vector.x2;
                this.bias += 0.1 * error;
            }

            errorSum += Math.pow(error, 2);
        });

        return errorSum / dataset.length;
    }
}

let brain = new Perceptron(0.1);
let mseHistory = [];

for (let epoch = 0; epoch < 50; epoch++) {
    let mse = brain.train(dataset);
    mseHistory.push(mse);
    
    if (mse === 0) {
        console.log(`learning ended at ${epoch} epoch!`);
        break;
    }
}

console.log("MSE history ", mseHistory);
console.log("weights at end ", brain.w1, brain.w2, "bias:", brain.bias);                                                                                                                                