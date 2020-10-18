import React from 'react';
import './FoodEntry.scss';

const foods = [
  { id: 1, name: 'Banana', calories: 120 },
  { id: 2, name: 'Orange', calories: 60 },
  { id: 3, name: 'Home Made Meal', calories: 1234}
];

export default function FoodEntry() {
  this.foods = foods;
  return (
    <ul>
      foods.forEach(food => <li key={food.id}>{food.name}: {food.calories}</li>);
    </ul>
  );
};
