import { randInt, yesterday, today, tomorrow } from '../../utils';

export const user = 'username69';

export const schema = {
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

const database = {};
database[user] = {}
database[user].log = [];
database[user].log.push({
  date: today(),
  entries: [
    { id: 610484, name: 'Old Gold Rum & Raisin', serving: '1 row', qty: 2,
      nutrition: mockValues() },
    { id: 592341, name: 'Steel Cut Oats', serving: '1/2 cup, uncooked', qty: 1,
      nutrition: mockValues() }
  ],
  totals: {
    // This should be nested within a Day with children Items and Totals from
    // the database. The API should handle the logic for calculating/returning
    // totals for each day, but the front-end may need to update the display
    // totals until the database is able to calculate and return them
    protein: mockValues().protein * 2,
    fat: mockValues().fat * 2,
    carbs: mockValues().carbs * 2,
    calories: mockValues().calories * 2,
  }
});
database[user].log.push({
  date: yesterday(today()),
  entries: [
    { id: 592342, name: 'Wet Ass Pudding', serving: '1/2 cup, uncooked', qty: 1,
      nutrition: mockValues() }
  ],
  totals: {
    protein: mockValues().protein,
    fat: mockValues().fat,
    carbs: mockValues().carbs,
    calories: mockValues().calories,
  }
});
database[user].log.push({
  date: tomorrow(today()),
  entries: [
    { id: 592342, name: 'Baby Got Backstrap', serving: '1 Large portion', qty: 1,
      nutrition: mockValues() }
  ],
  totals: {
    protein: mockValues().protein,
    fat: mockValues().fat,
    carbs: mockValues().carbs,
    calories: mockValues().calories,
  }
});
database[user].foods = [
  { id: 847204, name: 'Banana', serving: '1 medium', qty: 1,
    nutrition: mockValues() },
  { id: 814439, name: 'Orange', serving: '1 medium', qty: 1,
    nutrition: mockValues() },
  { id: 147423, name: 'Home Made Meal', serving: '1 main portion', qty: 1,
    nutrition: mockValues() },
];

// TODO: Move this logic to the front-end and push totals to the database
// whenever an item is added to the log
/*
const getTotal = (value) => {
  return database.log.reduce((acc, curr) => {
    return acc + (curr.qty * curr.nutrition[value]);
  }, 0);
};
*/

console.log(database);

export default database;
