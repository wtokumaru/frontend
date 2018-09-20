import * as React from 'react';
import { Provider } from 'react-contextual';
import { Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

import CurrentDate from '../CurrentDate';
import Pages from './Pages';
import { withPageStore } from './decorators/withPageStore';
import withCurrentNation, {
  WithCurrentNationProps
} from '../Nation/decorators/withCurrentNation';

const TopPart = styled.div`
  flex-grow: 1;
`;

const WhiteSegment = styled(Segment)`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  opacity: 0.95;
`;

const LeftPane: React.SFC = ({ children }) => (
  <Sidebar.Pushable>
    <Sidebar
      animation="overlay"
      as={WhiteSegment}
      raised={true}
      visible={true}
      width="wide"
    >
      <Provider id="withPageStore" {...withPageStore}>
        <TopPart>
          <Pages />
        </TopPart>
      </Provider>

      <CurrentDate />
    </Sidebar>

    <Sidebar.Pusher>{children}</Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default LeftPane;