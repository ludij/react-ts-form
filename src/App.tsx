import React from 'react';
import styled from "@emotion/styled/macro"
import logo from './logo.svg';
import './App.css';

const CButton = styled.button(`
  color: red;
`)

function App() {
  return (
    <div className="App">
      <CButton>test</CButton>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
