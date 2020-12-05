import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Header,
} from 'semantic-ui-react';
import { isoDate, yesterday, tomorrow } from '../../../utils';

function DateScrubber ({ date, setDate }) {
  return (
    <Header as='h3' block>
      <Grid verticalAlign='middle'>
        <Grid.Row columns={2}>
          <Grid.Column>
            {isoDate(date)}
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button.Group>
              <Button compact icon='left chevron'
                onClick={() => setDate(yesterday(date))}/>
              <Button compact icon='right chevron'
                onClick={() => setDate(tomorrow(date))}/>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Header>
  )
}

DateScrubber.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DateScrubber;
