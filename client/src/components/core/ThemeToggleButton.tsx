import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';

import transientOptions from '../../utils/general';

// PROP TYPES
type ThemeToggleButtonProps = Omit<IconButtonProps, 'aria-label'>;

// CONSTS and LETS
const iconSize = 20;
interface RoundButtonProps {
  $colorMode: 'light' | 'dark';
}

const RoundButton = styled(IconButton, transientOptions)<RoundButtonProps>`
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
      position="fixed"
      bottom="30px"
      right="25px"
      size="lg"
      _hover={{
        transition: 'transform 0.3s ease-in-out',
        transform: 'scale(1.3)',
      }}
      {...props}
    />
  );
}

export default ThemeToggleButton;
