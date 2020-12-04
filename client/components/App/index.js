import React, { useState, useRef } from 'react';
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

export default function App () {

  const mockValues = () => {
    return {
      protein: randInt(1,30),
      fat: randInt(1,15),
      carbs: randInt(20,300),
      calories: randInt(20,500)
    };
  };

  const [foods, setFoods] = useState([
    { id: 847204, name: 'Banana', serving: '1 medium', qty: 1, nutrition: mockValues() },
    { id: 814439, name: 'Orange', serving: '1 medium', qty: 1, nutrition: mockValues() },
    { id: 147423, name: 'Home Made Meal', serving: '1 main portion', qty: 1, nutrition: mockValues() },
  ]);

  const getTotal = (value) => {
    let acc = 0;
    return log.reduce((acc, curr) => {
      return acc + (curr.qty * curr.nutrition[value]);
    }, 0);
  };

  const searchField = useRef();
  const inputDefault = {
    name: '',
    serving: '',
    protein: '',
    fat: '',
    carbs: '',
    calories: ''
  };
  const [input, setInput] = useState(inputDefault);
  const clearInput = () => setInput(inputDefault);

  const [log, setLog] = useState([
    { id: 610484, name: 'Old Gold Rum & Raisin', serving: '1 row', qty: 2, nutrition: mockValues() },
    { id: 592341, name: 'Steel Cut Oats', serving: '1/2 cup, uncooked', qty: 1, nutrition: mockValues() }
  ]);

  const [editMode, setEditMode] = useState(false);

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
    console.log(searchField);
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
          {log.map(item => {
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
            <Table.HeaderCell>{getTotal('protein')}</Table.HeaderCell>
            <Table.HeaderCell>{getTotal('fat')}</Table.HeaderCell>
            <Table.HeaderCell>{getTotal('carbs')}</Table.HeaderCell>
            <Table.HeaderCell>{getTotal('calories')}</Table.HeaderCell>
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
      {foods && (
        <FoodList foods={foods.filter(food => {
              const regex = new RegExp(input.name,'gi');
              return food.name.match(regex);
      })} logFood={logFood} />
      )}
    </Container>
  );
};
