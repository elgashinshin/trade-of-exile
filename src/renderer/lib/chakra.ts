import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    useSystemColorMode: true,
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    components: {
      Button: {},
    },
  },
  withDefaultColorScheme({ colorScheme: 'purple' })
);

export default theme;
