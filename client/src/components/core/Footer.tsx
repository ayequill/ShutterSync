import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import { Flex, Icon, Link, Text, Tooltip } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex
      as="footer"
      bg="gray.800"
      color="white"
      py="1rem"
      px="1rem"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Flex fontSize={{ base: 'sm', lg: 'sm' }} w="100%">
        <Text
          textAlign="left"
          mb="10px"
          className="animate__animated animate__bounceInLeft"
        >
          Shutter
        </Text>
        <Text color="blue.500">Sync</Text>
        <Text fontSize="0.6rem">&copy; 2023</Text>
      </Flex>
      <Flex gap={4}>
        <Tooltip label="Siaw's X Account" placement="left-start">
          <Link href="https://twitter.com/ayequill" target="_blank">
            <Icon fontSize="xl" cursor="pointer" as={FaXTwitter} />
          </Link>
        </Tooltip>

        <Tooltip label="Siaw's Github Account" placement="top">
          <Link href="https://github.com/ayequill" target="_blank">
            <Icon fontSize="xl" cursor="pointer" as={FaGithub} />
          </Link>
        </Tooltip>
        <Tooltip label="Siaw's Linkedin Account" placement="right-end">
          <Link href="https://linkedin.com/in/siaw" target="_blank">
            <Icon fontSize="xl" cursor="pointer" as={FaLinkedin} />
          </Link>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
