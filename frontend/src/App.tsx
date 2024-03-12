import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box,Button,ChakraProvider, Input } from '@chakra-ui/react'
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState("Marty");
  const [lastName, setLastName] = useState("McFly");




  const callBackend = async() =>{
    const response = await axios.post('http://localhost:8000/name',{
      firstName,
      lastName
    })
    console.log("RESPONSE:::: ", response.data)
  }

  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4} >
        <Input onChange={(event:any) => setFirstName(event.target.value)} placeholder='Type in a first name ...' />
        <Input onChange={(event:any) => setLastName(event.target.value)} placeholder='Type in a last name ...' />
        <Button colorScheme='blue' onClick={callBackend}>
          Add Name
        </Button>
      </Box>

    </ChakraProvider>
  );
}

export default App;
