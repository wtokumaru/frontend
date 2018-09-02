import * as React from 'react';
import { compose } from 'recompose';
import { Icon, List, ListProps } from 'semantic-ui-react';

import mockData from '../../mockData';
import Routes from '../../../routes';
import withCurrentDate, {
  WithCurrentDateProps
} from '../../CurrentDate/decorators/withCurrentDate';
import withCurrentNation, {
  WithCurrentNationProps
} from '../../decorators/withCurrentNation';

const Territories: React.SFC<
  ListProps & WithCurrentDateProps & WithCurrentNationProps
> = ({ currentDate, currentNation }) => (
  <List selection={true}>
    {mockData.map(({ endDate: endDateFromData, id, startDate }) => {
      // If no endDate is specified, we consider it today
      const endDate = endDateFromData ? endDateFromData : new Date();

      // Convert `startDate` to yyyy/mm/dd format
      const url = startDate
        .toISOString()
        .split('T')[0]
        .split('-')
        .join('/');

      const isActive = currentDate >= startDate && currentDate <= endDate;

      return (
        <Routes.Link key={id} route={`/map/${url}/${currentNation}`}>
          <List.Item>
            <List.Header>
              {isActive && <Icon name="caret right" />}
              From {startDate.getFullYear()} to{' '}
              {endDateFromData ? endDate.getFullYear() : 'today'}
            </List.Header>
            {isActive && <List.Content>Currently shown on map</List.Content>}
          </List.Item>
        </Routes.Link>
      );
    })}
  </List>
);

export default compose(
  withCurrentDate,
  withCurrentNation
)(Territories);
