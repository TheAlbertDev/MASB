import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './colors';
import fonts from './fonts';
import Link from './components/Link';
import config from './config';

const theme = {
  fonts,
  styles,
  components: { Link },
  colors,
  config,
};

const customeTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'teal' }),
  theme
);

export const Theme = typeof customeTheme;
export default customeTheme;
