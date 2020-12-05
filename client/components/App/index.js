import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';
import Log from '../Log';
import FoodForm from '../FoodForm';
import FoodList from '../FoodList';
import DateScrubber from '../DateScrubber';
import './App.scss';
import { randInt, today } from '../../../utils';
import { API } from '../../services/';

export default function App () {

  // Initialise the app in a "loading" state
  // and set up all states
  // const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState();
  const [log, setLog] = useState();
  const [date, setDate] = useState(today);
  const [editMode, setEditMode] = useState(false);
  // For setting focus after form submission
  const searchField = useRef();

  // Set an empty input field for each one specified by the Schema
  const inputs = {};
  Object.keys(API.schema())
    .forEach(key => inputs[key] = '');

  const [input, setInput] = useState(inputs);
  const clearInput = () => setInput(inputs);

  // Get the log and totals for today
  useEffect(() => {
    API.fetchLog(date)
    // TODO: Separate entries and totals back out here but leave them
    // consolidate in the API call
      .then(data => setLog(data))
      .catch(() => setLog())
  }, [date]);

  // Get the food data (once)
  useEffect(() => {
    API.fetchFoods()
      .then(data => setFoods(data))
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  };

  const createFood = () => {
    setEditMode(true);
  };

  const saveFood = () => {
    console.log('Saving the food');
    // Get all the inputs
    const { name, serving, protein, fat, carbs, calories } = input;
    // Store nutrition info in a sub-document
    const nutrition = { protein, fat, carbs, calories};
    // Give it an ID
    const id = randInt(100000, 999999);
    // Add it to the state
    setFoods(foods => [...foods, { id, name, serving, qty: randInt(1,3), nutrition }]);
    // Clear all input
    clearInput();
    // Turn off the form
    setEditMode(false);
    // Put focus back in the form
    searchField.current.focus();
  }

  const logFood = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ' || !e.key) {
      const food = foods.find(food => food.id === id);
      setLog(log => {
        const { entries, totals } = log;
        return {
          entries: [...entries, food],
          // TODO: Increment the totals with the selected food's values
          totals
        }
      });
      searchField.current.focus();
    } else console.log(e.key);
  };

  return (
    <Container>
      <DateScrubber date={date} setDate={setDate} />
      {log && (<Log log={log} date={date} />)}
      <Form onSubmit={createFood}>
        <Form.Field>
          <label>User Input</label>
          <Input icon placeholder='Search/Add...'>
            <input name='name' autoFocus
              onChange={handleChange} value={input.name}
              ref={searchField} />
            <Icon name='add' link onClick={createFood} />
          </Input>
        </Form.Field>
      </Form>
      {editMode && (<FoodForm input={input} setInput={setInput}
        saveFood={saveFood} handleChange={handleChange} />)}
      {foods && (
        <FoodList foods={foods.filter(food => {
          const regex = new RegExp(input.name,'gi');
          return food.name.match(regex);
        })} logFood={logFood} />
      )}
    </Container>
  );
}
