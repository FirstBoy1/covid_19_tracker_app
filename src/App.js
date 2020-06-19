import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import covidImage from './images/covid_image.png';
import { api_endpoint } from './config';
import CountryChart from './components/CountryChart';
import GlobalChart from './components/GlobalChart';
import CountarySelector from './components/CountarySelector';
import SummaryList from './components/SummaryList';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #fafafa;

  }
`;

const theme = {
  blue: '#7F7FFF',
  green: '#7FFF7F',
  red: '#FF7F7F',
};

const AppStyles = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  img,
  select {
    align-self: center;
  }
`;

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [details, setDetails] = useState({
    infected: '',
    deaths: '',
    recovered: '',
    lastUpdate: '',
  });

  useEffect(() => {
    fetch(api_endpoint + '/countries')
      .then((res) => res.json())
      .then((res) => setCountries(res.countries));
  }, []);

  useEffect(() => {
    (async () => {
      const endpoint = selectedCountry
        ? `${api_endpoint}/countries/${selectedCountry}`
        : api_endpoint;
      const res = await fetch(endpoint);
      const { confirmed, deaths, recovered, lastUpdate } = await res.json();
      setDetails({
        infected: confirmed.value,
        deaths: deaths.value,
        recovered: recovered.value,
        lastUpdate,
      });
    })();
  }, [selectedCountry]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppStyles>
        <img src={covidImage} alt="covid" />
        <SummaryList details={details} />
        <CountarySelector
          countries={countries}
          handleCountryChange={setSelectedCountry}
        />
        {selectedCountry ? (
          <CountryChart details={details} country={selectedCountry} />
        ) : (
          <GlobalChart />
        )}
      </AppStyles>
    </ThemeProvider>
  );
}

export default App;
