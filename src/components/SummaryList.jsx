import React from 'react';
import styled from 'styled-components';
import SummaryBox from './SummaryBox';

const SummaryListStyles = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
`;

export default function SummaryList({ details }) {
  const { infected, deaths, recovered, lastUpdate } = details;
  return (
    <SummaryListStyles>
      <SummaryBox
        title={'Infected'}
        total={infected}
        lastUpdate={lastUpdate}
        color={'blue'}
        description={'Number of active cases of COVID-19'}
      />
      <SummaryBox
        title={'Recovered'}
        total={recovered}
        lastUpdate={lastUpdate}
        color={'green'}
        description={'Number of recoveries cases from COVID-19'}
      />
      <SummaryBox
        title={'Deaths'}
        total={deaths}
        lastUpdate={lastUpdate}
        color={'red'}
        description={'Number of deaths caused by COVID-19'}
      />
    </SummaryListStyles>
  );
}
