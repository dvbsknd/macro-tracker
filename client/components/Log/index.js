import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'semantic-ui-react';

function Log ({ log, totals }) {
  return (
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
          {Object.keys(totals).map(key => {
            return (
              <Table.HeaderCell key={key}>{totals[key]}</Table.HeaderCell>
            )})}
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

Log.propTypes = {
  log: PropTypes.array.isRequired,
  totals: PropTypes.object.isRequired,
};

export default Log;
