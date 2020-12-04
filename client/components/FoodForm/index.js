import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Divider,
  Button,
} from 'semantic-ui-react';

function FoodForm ({ input, handleChange, saveFood }) {
  const keys = Object.keys(input).filter(key => key !== 'name');
  return (
    <>
      <Divider horizontal>
        Details
      </Divider>
      <Form onSubmit={saveFood} >
        <Form.Group widths='equal'>
          {input && keys.map(key => {
            const label = key.replace(key[0], key[0].toUpperCase())
            return (
            <Form.Input name={key} key={key} fluid label={label} onChange={handleChange}
              placeholder='Enter...' value={input[key]} />
          )})}
        </Form.Group>
        <Button type='submit'>Add</Button>
      </Form>
    </>
  )
}

FoodForm.propTypes = {
  input: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  saveFood: PropTypes.func.isRequired,
};

export default FoodForm;
