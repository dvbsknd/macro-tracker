import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Form,
  List,
  Table,
  Input,
  Icon,
  Label
} from 'semantic-ui-react';
import FoodForm from '../FoodForm';
import FoodList from '../FoodList';
import './App.scss';
import { randInt } from '../../../utils';
import { API } from '../../services/';

export default function App () {

  // Initialise the app in a "loading" state
  // and set up all states
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState({});
  const [log, setLog] = useState({});
  const [totals, setTotals] = useState({});
  const [editMode, setEditMode] = useState(false);
  // For setting focus after form submission
  const searchField = useRef();

  // Set an empty input field for each one specified by the Schema
  const inputs = {};
  const schemaFields = Object.keys(API.schema())
    .forEach(key => inputs[key] = '');;

  const [input, setInput] = useState(inputs);
  const clearInput = () => setInput(inputs);

  // Get food and log data
  useEffect(() => {
    API.fetch('foods')
      .then(data => setFoods(data))
      .then(() => API.fetch('log'))
      .then(data => setLog(data))
      .then(() => API.totals())
      .then(data => {
        console.log(data);
        setTotals(data)
      })
      .then(() => setLoading(false));
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
      setLog(log => [...log, food]);
    } else console.log(e.key);
  };

  return (
    <Container>
      <Table size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Food</Table.HeaderCell>
            <Table.HeaderCell>Serving</Table.HeaderCell>
            <Table.HeaderCell>Qty.</Table.HeaderCell>
            <Table.HeaderCell>Protein.</Table.HeaderCell>
            <Table.HeaderCell>Fat</Table.HeaderCell>
            <Table.HeaderCell>Carbs</Table.HeaderCell>
            <Table.HeaderCell>Calories</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {log.map && log.map(item => {
            const { id, name, serving, qty, nutrition } = item;
            const { protein, fat, carbs, calories } = nutrition;
            return (
              <Table.Row key={id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{serving}</Table.Cell>
                <Table.Cell>{qty}</Table.Cell>
                <Table.Cell>{qty * protein}</Table.Cell>
                <Table.Cell>{qty * fat}</Table.Cell>
                <Table.Cell>{qty * carbs}</Table.Cell>
                <Table.Cell>{qty * calories}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            {totals && Object.keys(totals).map(key => {
              return (
                <Table.HeaderCell key={key}>{totals[key]}</Table.HeaderCell>
              )})}
          </Table.Row>
        </Table.Footer>
      </Table>
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
      {foods.filter && (
        <FoodList foods={foods.filter(food => {
          const regex = new RegExp(input.name,'gi');
          return food.name.match(regex);
        })} logFood={logFood} />
      )}
    </Container>
  );
};
