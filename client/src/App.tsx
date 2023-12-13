import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@fontsource-variable/nunito';

import MainRouter from './MainRouter';
import theme from './theme';

const customStyles = `
  ::-webkit-scrollbar{
    width: .60rem;
    background-color: rgba(20, 20, 20, 0.301);
    border-radius: 5rem;
  }
  ::-webkit-scrollbar-thumb{
    background: rgba(122, 128, 138, 0.8);
    border-radius: .75rem;
  }
`;
function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {/* eslint-disable-next-line max-len */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <style>{customStyles}</style>
      <MainRouter />
    </ChakraProvider>
  );
}

export default App;
