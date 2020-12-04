import { randInt } from '../../utils';

const schema = {
  food: {
    name: 'String',
    serving: 'Float',
    protein: 'Float',
    fat: 'Float',
    carbs: 'Float',
    calories: 'Int'
  },
};

const mockValues = () => {
  return {
    protein: randInt(1,30),
    fat: randInt(1,15),
    carbs: randInt(20,300),
    calories: randInt(20,500)
  };
};

const database = {
  foods: [
    { id: 847204, name: 'Banana', serving: '1 medium', qty: 1,
      nutrition: mockValues() },
    { id: 814439, name: 'Orange', serving: '1 medium', qty: 1,
      nutrition: mockValues() },
    { id: 147423, name: 'Home Made Meal', serving: '1 main portion', qty: 1,
      nutrition: mockValues() },
  ],
  log: [
    { id: 610484, name: 'Old Gold Rum & Raisin', serving: '1 row', qty: 2,
      nutrition: mockValues() },
    { id: 592341, name: 'Steel Cut Oats', serving: '1/2 cup, uncooked', qty: 1,
      nutrition: mockValues() }
  ],
};

const getTotal = (value) => {
  return database.log.reduce((acc, curr) => {
    return acc + (curr.qty * curr.nutrition[value]);
  }, 0);
};

database.totals = {
  // This should be nested within a Day with children Items and Totals from
  // the database. The API should handle the logic for calculating/returning
  // totals for each day, but the front-end may need to update the display
  // totals until the database is able to calculate and return them
  protein: getTotal('protein'),
  fat: getTotal('fat'),
  carbs: getTotal('carbs'),
  calories: getTotal('calories'),
};

export const API = {
  fetch: function (collection) {
    return new Promise((resolve) => resolve(database[collection]));
  },
  schema: function () { return schema.food },
  totals: function () {
    return new Promise((resolve) => resolve(database.totals));
  },
};
