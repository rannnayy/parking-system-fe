// import { useState } from 'react'
import './App.css'
import { Text, Container, VStack, Box, useTheme } from "@chakra-ui/react";
import Statistics from './statistics/statistics';

function App() {
  const theme = useTheme();

  return (
    <Container maxW={'-moz-max-content'} p={0} h={'100vh'}>
      <Box
        position="relative"
        h={'95vh'}
        bgImage="/hero3.jpeg"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        left={0}
        right={0}
        width="100vw"
        maxWidth="100%"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bg={theme.colors.white}
          opacity={0.5}
          bgBlendMode="multiply"
        />
        <VStack
          position="relative"
          zIndex={1}
          textAlign="center"
          display="flex"
          justifyContent="center"
          minH={'95vh'}
        >
          <Text as="b" fontSize="6xl">FlexPay</Text>
          <Text>Pay toll and parking fee conveniently!</Text>
        </VStack>
      </Box>
      <Statistics/>
      <Text fontSize={'md'} h={'5vh'} bgColor={theme.colors.grey} color={theme.colors.choco}>FlexPay&copy; 2024</Text>
    </Container>
  )
}

export default App
