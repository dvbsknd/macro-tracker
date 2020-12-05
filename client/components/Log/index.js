import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'semantic-ui-react';

function Log ({ log }) {
  const { entries, totals } = log;
  return (
    <>
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
          {entries.map(item => {
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
    </>
  )
}

Log.propTypes = {
  log: PropTypes.exact({
    entries: PropTypes.arrayOf(PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      serving: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired,
      nutrition: PropTypes.object.isRequired,
    })).isRequired,
    totals: PropTypes.shape({
      protein: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
    }).isRequired,
  })
};

export default Log;
