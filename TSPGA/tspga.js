const { shuffle, randomEx } = require('../Util/util');

class TSPGA {
    constructor(citiesDistance, populationSize) {
        this.cities = 12;
        this.citiesDistance = citiesDistance;
        this.populationSize = populationSize;
        this.order = this.initOrder();
        this.population = this.initPopulation();
        this.individualFitnessScore = [];
        this.iteration = 0;
    }

    initOrder = () => {
        let arrangement = [];

        for(let a = 0; a < this.cities; a++) {
            arrangement[a] = a + 1;
        }

        return arrangement;
    }

    initPopulation = () => {
        let crowd = [];

        for(let i = 0; i < this.populationSize; i++) {
            crowd[i] = this.order.slice();
            shuffle(crowd[i], 10);
        }

        return crowd;
    }

    getLocation = order => {
        let currentCity = [];
        let nextCity = [];
        
        for(let d = 1; d < order.length; d++) {
            currentCity.push(order[d-1]);
            nextCity.push(order[d]);
        }

        // console.log("current city: " + currentCity);
        // console.log(nextCity)
        return {
            currentCity: currentCity,
            nextCity: nextCity
        }
    }

    calcDistance = (order) => {
        let { currentCity, nextCity } = this.getLocation(order);
        let distance = [];
        let totalDistance;

        for(let d = 0; d < currentCity.length; d++) {
            let city = currentCity[d];
            let destinationCity = nextCity[d];
            let cityDistances = this.citiesDistance[city];
            console.log("cityDistances: " + cityDistances)
            if(destinationCity == 12) {
                destinationCity = 11;
            }
            let cityDistance = cityDistances[destinationCity];
            console.log("destinationCity: " + destinationCity);
            console.log("distance: " + cityDistance);
            distance.push(cityDistance);
        }

        totalDistance = distance.reduce((prev, curr) => prev + curr, 0);
        console.log(totalDistance);
        return totalDistance;
    }

    getFitnessScore = () => {
        let population = this.population;
        let temp;
        let mintemp;

        for(let p = 0; p < population.length; p++) {
            temp = this.calcDistance(population[p]);
            mintemp = 1/temp;
            this.individualFitnessScore[p] = mintemp;
        }

        console.log("individual fitness score");
        console.log("================================================================");
        console.log(this.individualFitnessScore);
    }

    getSelectedRWIndex = rwValues => {
        let selectedRWIndex;
        let selector = (Math.random() * 360);
        let accumulator = 0;

        console.log("selector...");
        console.log("=======================================================================");
        console.log(selector);

        for(let i = 0; i < rwValues.length; i++) {
            accumulator = accumulator + rwValues[i];
            if(selector <= accumulator) {
                selectedRWIndex = i;
                break;
            }
        }

        return selectedRWIndex;
    }

    rwSelection = () => {
        this.getFitnessScore();
        let population = this.population.slice();
        let totalFitness = this.individualFitnessScore.reduce((prev, curr) => prev + curr, 0);
        let rwValues = this.individualFitnessScore.map(val => (val/totalFitness) * 360);

        console.log("rwValues....")
        console.log("=======================================================================");
        console.log(rwValues);

        for(let p = 0; p < this.population.length; p++) {
            let index = this.getSelectedRWIndex(rwValues);
            let selected = this.population[index];

            console.log("selected...");
            console.log("=======================================================================");
            console.log("selection: " + p);
            console.log(selected);
            population[p] = selected;
        }

        this.population = population;

        console.log("next generation...");
        console.log(this.population);
    }

    crossOverCross = (parentA, parentB, Index) => {
        console.log("crossover point");
        console.log(Index);
        let newParentA = parentA.slice(0, Index);
        let newParentB = parentB.slice(0, Index);

        for(let i = 0; i < parentB.length; i++) {
            if(!newParentA.includes(parentB[i])) {
                newParentA.push(parentB[i]);
            }

            if(!newParentB.includes(parentA[i])) {
                newParentB.push(parentA[i]);
            }
        }

        parentA = newParentA;
        parentB = newParentB;

        console.log("After crossover: ");
        console.log(parentA)
        console.log(parentB);
    }

    crossOver = () => {
        let population = this.population.slice();
        let crossRateProb = 0.9;
        let cities = this.cities;
        let crossProb = Math.random();
        let crossPoint = Math.floor(randomEx(5, cities));

        for(let p = 1; p < this.population.length; p++) {
            if(crossRateProb >= crossProb) {
                this.crossOverCross(population[p-1], population[p], crossPoint);
            }
        }

        this.population = population;

        console.log("Crossing...");
        console.log("===================================================================");
        console.log("\n");
        console.log("next generation");
        console.log(this.population);
    }

    mutation = () => {

    }

    calculate = (maxIterations = 50) => {
        while(this.iteration < maxIterations) {
            this.rwSelection();
            this.crossOver();
            this.iteration++
        }

        console.log("iteration done");
    }
    
}

module.exports = TSPGA;