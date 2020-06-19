import React from 'react';
import styled from 'styled-components';

const SelectStyles = styled.select`
  outline: none;
  border: none;
  background: none;
  padding: 0.5rem 0;
  font-size: inherit;
  border-bottom: 2px solid black;
  color: #555;
  min-width: 25rem;
  margin-bottom: 1.5rem;
`;

export default function CountarySelector({ countries, handleCountryChange }) {
  return (
    <SelectStyles onChange={(e) => handleCountryChange(e.target.value)}>
      <option value="">Global</option>
      {countries.map(({ name }) => (
        <option value={name} key={name}>
          {name}
        </option>
      ))}
    </SelectStyles>
  );
}
