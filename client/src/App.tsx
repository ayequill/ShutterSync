import React from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@fontsource/montserrat';

import NavBar from './components/core/NavBar';
import MainRouter from './MainRouter';
import theme from './theme';

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {/* eslint-disable-next-line max-len */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <NavBar />
      <MainRouter />
    </ChakraProvider>
  );
}

export default App;
