import React from 'react';
import {
  List,
  Table,
  Label,
} from 'semantic-ui-react';

const getColour = (stat) => {
  const colourMap = {
    protein: 'teal',
    fat: 'red',
    carbs: 'brown',
    calories: 'black'
  };
  return colourMap[stat];
}

export default function FoodList ({ foods, logFood }) {
  return (
    <List>
      {foods.map(item => {
        const { id, name, serving, qty, nutrition } = item;
        const stats = Object.keys(nutrition);
        return (
          <List.Item key={id} tabIndex='0' 
            onClick={(e) => logFood(e, id)}
            onKeyPress={(e) => logFood(e, id)}>
            <List.Content>
              <Table size='small' basic='very' collapsing>
                <Table.Body>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'>
                      {name}
                    </Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    {stats.map(stat => (
                      <Table.Cell key={stat}>
                        <Label color={getColour(stat)} horizontal>
                          {stat.charAt(0).toUpperCase()}
                        </Label>
                        {nutrition[stat]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                </Table.Body>
              </Table>
            </List.Content>
          </List.Item>
        )
      })}
    </List>
  )
};
