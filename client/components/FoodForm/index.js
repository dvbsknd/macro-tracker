import React from 'react';
import {
  Form,
  Divider,
  Button,
} from 'semantic-ui-react';

export default function FoodForm ({ input, setInput, handleChange, saveFood }) {
  const keys = Object.keys(input).filter(key => key !== 'name');
  return (
    <>
      <Divider horizontal>
        Details
      </Divider>
      <Form onSubmit={saveFood} >
        <Form.Group widths='equal'>
          {input && keys.map(key => (
            <Form.Input name={key} key={key} fluid label={key} onChange={handleChange}
              placeholder='Enter...' value={input[key]} />
          ))}
        </Form.Group>
        <Button type='submit'>Add</Button>
      </Form>
    </>
  )
};
