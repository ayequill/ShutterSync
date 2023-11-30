import React from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@fontsource-variable/nunito';

import MainRouter from './MainRouter';
import theme from './theme';

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {/* eslint-disable-next-line max-len */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <MainRouter />
    </ChakraProvider>
  );
}

export default App;
