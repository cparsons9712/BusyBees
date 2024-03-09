import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box,Button,ChakraProvider, Input } from '@chakra-ui/react'
import axios from 'axios';

function App() {
  const [name, setName] = useState("jo kangaroo");

  const onChange = (event:any) => {
    setName(event.target.value)
  }

  const callBackend = async() =>{
    const response = await axios.post('http://localhost:8000/name',{
      name
    })
    console.log("RESPONSE:::: ", response)
  }

  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4} >
        <Input onChange={onChange} placeholder='Type in a name ...' />
        <Button colorScheme='blue' onClick={callBackend}>
          Add Name
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
