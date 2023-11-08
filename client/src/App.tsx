import React from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import NavBar from './components/core/NavBar';
import MainRouter from './MainRouter';
import theme from './theme';

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <NavBar />
      <MainRouter />
    </ChakraProvider>
  );
}

export default App;
