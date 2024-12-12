/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ConfigProvider } from 'antd';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={{ 
      // token: { colorPrimary: '#0096FE', }, 
      }} >
      <GlobalStyle />
      <App />
    </ConfigProvider>
  </StrictMode>,
)
