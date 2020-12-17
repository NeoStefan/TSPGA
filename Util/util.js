const Random = (min, max) => {
    let number;
    min = Math.ceil(min);
    max = Math.floor(max);
    number = Math.random() * (max - min + 1) + min;
    return number;
}

const RandomMaxExcluded = (min, max) => {
    let number;
    min = Math.ceil(min);
    max = Math.floor(max);
    number = Math.random() * (max - min) + min;
    return number;
}

const Swap = (arr, i, j) => {
    let temp;

    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const Shuffle = (arr, num) => {
    let max = arr.length - 1;

    for(let i = 0; i < num; i++) {
        let index1 = Math.floor(Random(0, max));
        let index2 = Math.floor(Random(0, max));
        Swap(arr, index1, index2);
    }
}

module.exports = {
    shuffle: Shuffle,
    randomEx: RandomMaxExcluded
};