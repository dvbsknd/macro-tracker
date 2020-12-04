import React from 'react';
import PropTypes from 'prop-types';
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

function FoodList ({ foods, logFood }) {
  return (
    <List>
      {foods.map(item => {
        const { id, name, serving, nutrition } = item;
        const stats = Object.keys(nutrition);
        return (
          <List.Item key={id} tabIndex='0'
            onClick={(e) => logFood(e, id)}
            onKeyPress={(e) => logFood(e, id)}>
            <List.Content>
              <Table size='small' basic='very' collapsing>
                <Table.Body>
                  <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                      {name} ({serving})
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
}

FoodList.propTypes = {
  foods: PropTypes.array.isRequired,
  logFood: PropTypes.func.isRequired,
};

export default FoodList;
