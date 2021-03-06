/*
 * Fill out the Person prototype
 * function "buyDrink" which given a drink object which looks like:
 * {
 *     name: "beer",
 *     cost: 8.50,
 *     alcohol: true
 * }
 * will add the cost to the person expences if the person
 * is
 *    1. old enough to drink (if the drink is alcohol)
 *    2. buying the drink will not push their tab over $1000
 *
 * in addition write a function "getRecipt" which returns a list as such
 * [
 *    {
 *        name: beer,
 *        count: 3,
 *        cost: 25.50
 *    }
 * ]
 *
 * which summaries all drinks a person bought by name in order
 * of when they were bought (duplicate buys are stacked)
 *
 * run with `node objects.js <name> <age> <drinks file>`
 * i.e
 * `node v.js alex 76 drinks.json`
 */

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.tab = 0;
    this.history = {};
    this.historyLen = 0;
    this.canDrink = function() {
      return this.age >= 18;
    };
    this.canSpend = function(cost) {
      return this.tab + cost <= 1000;
    }
}

// write me
Person.prototype.buyDrink = function(drink) {
  // if (!this.canDrink()){
  //   return;
  // }
  if (!this.canSpend(drink.cost)){
      return;
  }
  if ( drink.alcohol === true && this.canDrink() ||  drink.alcohol === false ){
    this.tab+=drink.cost;
    if (drink.name in this.history){
      this.history[drink.name]['count']+=1;
      this.history[drink.name]['total']+=drink.cost;
      return;
    }
  }else{
    return;
  }
  const result = { name:drink.name,
                   count:1,
                   total:drink.cost};
  this.history[drink.name]=result;
  this.historyLen+= 1;
  
}
// write me
Person.prototype.getRecipt = function() {
  array = [];
  for (var i in this.history) {
    array.push(this.history[i]);
  }
  return array;
}


const name = process.argv[2];
const age = parseInt(process.argv[3]);
const drinksJson = process.argv[4]
if (name === undefined || age === undefined || drinksJson === undefined) {
  throw new Error(`input not supplied`);
}
const drinks = require(`./${drinksJson}`);
const p = new Person(name, age);
for (let drink of drinks) {
  // console.log(drink);
  p.buyDrink(drink)
}
console.log(p.getRecipt());


