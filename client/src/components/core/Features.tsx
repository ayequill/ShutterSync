import { motion } from 'framer-motion';

import { color, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';

import Customer from '../../assets/customer1.webp';
import Flow from '../../assets/flow.webp';
import MobileInHand from '../../assets/mobile-in-hand.webp';

function Features() {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 1 }}
      mt="50px"
      p={4}
      spacing={{ base: 10, lg: 20 }}
    >
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap={{ base: 10, lg: 10 }}
        py={10}
        px={6}
        // boxShadow="0px 4px 6px rgba(65, 65, 204, 0.25),
        // 0 1px 3px rgba(226, 211, 211, 0.1)"
        boxShadow="md"
        bg="white"
        transition="box-shadow 0.9s ease-in-out"
        borderRadius={10}
        bgGradient="linear(to-bl, blue.50, blackAlpha.50)"
        _dark={{
          bgGradient: 'linear(to-bl, blue.500, blackAlpha.50)',
          color: 'black',
        }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
        >
          <Image
            src={MobileInHand}
            alt="Customer"
            width={{ base: '200px', md: '300px', lg: '400px' }}
            backdropBlur="2xl"
          />
        </motion.div>
        <motion.div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexBasis: '50%',
          }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
        >
          <Text
            textAlign="center"
            fontSize={{ base: 'sm', lg: 'lg' }}
            width={{ base: '100%', md: '100%' }}
            lineHeight="6"
          >
            Effortlessly organize and showcase your stunning portfolio with
            ShutterSync intuitive gallery management. Seamlessly upload,
            arrange, and update your work to create a visual narrative that
            captivates clients and enhances your professional image.
          </Text>
        </motion.div>
      </Flex>

      <Flex
        flexDir={{ base: 'column', md: 'row-reverse' }}
        justify="space-between"
        align="center"
        gap={{ base: 10, lg: 10 }}
        py={10}
        px={6}
        // boxShadow="0px 4px 6px rgba(65, 65, 204, 0.25),
        // 0 1px 3px rgba(226, 211, 211, 0.1)"
        boxShadow="md"
        bg="white"
        transition="box-shadow 0.9s ease-in-out"
        borderRadius={10}
        bgGradient="linear(to-l, blue.50, blackAlpha.50)"
        _dark={{
          bgGradient: 'linear(to-bl, blue.500, blackAlpha.50)',
          color: 'black',
        }}
      >
        <motion.div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexBasis: '50%',
          }}
          initial={{ x: '100%' }}
          whileInView={{ x: 0 }}
          transition={{
            duration: 1,
            type: 'spring',
            bounce: 0.5,
          }}
          viewport={{ once: true }}
        >
          <Image
            src={Customer}
            alt="Customer"
            width={{ base: '200px', md: '300px', lg: '400px' }}
            backdropBlur="2xl"
            ml={10}
          />
        </motion.div>
        <motion.div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexBasis: '50%',
          }}
          initial={{ x: '-100%' }}
          whileInView={{ x: 0 }}
          transition={{
            duration: 1,
            type: 'spring',
            bounce: 0.5,
          }}
          viewport={{ once: true }}
        >
          <Text
            textAlign="center"
            fontSize={{ base: 'sm', lg: 'lg' }}
            width={{ base: '100%', md: '100%' }}
            lineHeight="6"
          >
            Foster meaningful interactions with clients through
            ShutterSync&apos;s collaborative features. Invite feedback, share
            drafts, and streamline communication to ensure that every project
            unfolds with precision.
          </Text>
        </motion.div>
      </Flex>

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap={{ base: 10, lg: 10 }}
        py={10}
        px={6}
        // boxShadow="0px 4px 6px rgba(65, 65, 204, 0.25),
        // 0 1px 3px rgba(226, 211, 211, 0.1)"
        boxShadow="md"
        bg="white"
        transition="box-shadow 0.9s ease-in-out"
        borderRadius={10}
        bgGradient="linear(to-bl, blue.50, blackAlpha.50)"
        _dark={{
          bgGradient: 'linear(to-bl, blue.500, blackAlpha.50)',
          color: 'black',
        }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          whileInView={{ x: 0 }}
          transition={{
            duration: 1,
            type: 'spring',
            bounce: 0.5,
          }}
          viewport={{ once: true }}
        >
          <Image
            src={Flow}
            alt="Customer"
            width={{ base: '200px', md: '300px', lg: '400px' }}
            backdropBlur="2xl"
            ml={10}
          />
        </motion.div>

        <motion.div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexBasis: '50%',
          }}
          initial={{ x: '100%' }}
          whileInView={{ x: 0 }}
          transition={{
            duration: 1,
            type: 'spring',
            bounce: 0.5,
          }}
          viewport={{ once: true }}
        >
          <Text
            textAlign="center"
            fontSize={{ base: 'sm', lg: 'lg' }}
            width={{ base: '100%', md: '100%' }}
            lineHeight="6"
          >
            From initial concept to final delivery, ShutterSync optimizes your
            project workflow. Enjoy a centralized hub for all project assets,
            streamline file sharing, and track project progress effortlessly.
            Enhance your project management capabilities, allowing you to focus
            more on what you love – capturing extraordinary moments.
          </Text>
        </motion.div>
      </Flex>
    </SimpleGrid>
  );
}

export default Features;
