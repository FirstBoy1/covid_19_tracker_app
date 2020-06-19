import React from 'react';
import styled from 'styled-components';
import dateFormat from 'dateformat';

const SummaryBoxStyles = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.3em;
  border-bottom: 10px solid ${(props) => props.theme[props.color]};
  margin-right: 2rem;

  &:last-child {
    margin-right: 0;
  }

  .title {
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.3rem;
  }

  .faded {
    color: grey;
  }
  .total {
    font-size: 1.5rem;
  }
`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function SummaryBox({
  title,
  total,
  lastUpdate,
  description,
  color,
}) {
  return (
    <SummaryBoxStyles color={color}>
      <p className="title faded">{title}</p>
      <p className="total">{numberWithCommas(total)}</p>
      <p className="faded">
        {dateFormat(Date.parse(lastUpdate), 'dddd mmmm d yyyy')}
      </p>
      <p>{description}</p>
    </SummaryBoxStyles>
  );
}
