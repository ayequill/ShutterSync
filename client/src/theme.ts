import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
  body: 'Capriola, sans-serif',
};

const theme = extendTheme({ config, fonts });

export default theme;
