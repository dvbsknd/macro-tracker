import database, { schema, user } from './database';
import { sameDay } from '../../utils';

const API = {
  schema: function () { return schema.food },
  fetchLog: function (date) {
    return new Promise((resolve, reject) => {
      const { log } = database[user];
      try {
        const { entries, totals } = log.find(entry => sameDay(entry.date, date));
        resolve({ entries, totals })
      } catch (e) {
        reject('No log for supplied date');
      }
    });
  },
  fetchFoods: function () {
    const { foods } = database[user];
    return new Promise((resolve) => resolve(foods));
  },
};

export default API;
