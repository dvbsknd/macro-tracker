import database, { schema, user } from './database';
import { sameDay } from '../../utils';

const API = {
  schema: function () { return schema.food },
  fetchLog: function (date) {
    const { log } = database[user];
    const { entries, totals } = log.find(entry => sameDay(entry.date, date));
    console.log({ entries, totals });
    return new Promise((resolve) => resolve({ entries, totals }));
  },
  fetchFoods: function () {
    const { foods } = database[user];
    console.log(foods);
    return new Promise((resolve) => resolve(foods));
  },
};

export default API;
