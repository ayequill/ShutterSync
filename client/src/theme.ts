import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
  body: 'Capriola, sans-serif',
};

const styles = {
  global: {
    'html, body': {
      _dark: { bg: 'gray.900' },
      scrollBehavior: 'smooth',
    },
  },
};

const theme = extendTheme({ config, fonts, styles });

export default theme;
