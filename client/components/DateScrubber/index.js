import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
} from 'semantic-ui-react';
import { yesterday, tomorrow } from '../../../utils';

function DateScrubber ({ date, setDate }) {
  return (
    <Container fluid textAlign='right'>
      <Button.Group>
        <Button compact icon='left chevron'
          onClick={() => setDate(yesterday(date))}/>
        <Button compact icon='right chevron'
          onClick={() => setDate(tomorrow(date))}/>
      </Button.Group>
    </Container>
  )
}

DateScrubber.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DateScrubber;
