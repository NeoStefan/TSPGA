const citiesDistance = require('./Distance/distance');
const TSP = require('./TSPGA/tspga');

let tsp = new TSP(citiesDistance, 200);

console.log("\t\t\t population")
console.log("========================================================================");
console.log(tsp.population);

console.log("calculating...");
console.log("========================================================================");
tsp.calculate();