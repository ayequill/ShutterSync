import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';

import transientOptions from '../utils/general';

// PROP TYPES
type ThemeToggleButtonProps = Omit<IconButtonProps, 'aria-label'>;

// CONSTS and LETS
const iconSize = 20;

const RoundButton = styled(IconButton, transientOptions)`
    ${({ $colorMode }) => ($colorMode === 'light' ? 'black' : 'white')};
  & svg {
    width: ${iconSize}px;
    height: ${iconSize}px;
  }
`;

function ThemeToggleButton(props: ThemeToggleButtonProps): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <RoundButton
      $colorMode={colorMode}
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label={`Activate ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      isRound
      {...props}
    />
  );
}

export default ThemeToggleButton;
