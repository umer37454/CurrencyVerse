import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, theme } from '@chakra-ui/react'

const main = document.getElementById('root');

const root = ReactDOM.createRoot(main);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

export const server = `https://api.coingecko.com/api/v3`; 