import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box,Button,ChakraProvider } from '@chakra-ui/react'
import axios from 'axios';

function App() {
  const callBackend = async() =>{
    const response = await axios.get('http://localhost:8000/')
    console.log("RESPONSE:::: ", response)
  }

  return (
    <ChakraProvider>
      <Box>Hii FROM ApP</Box>
      <Button colorScheme='yellow' onClick={callBackend}>Button</Button>
    </ChakraProvider>
  );
}

export default App;
