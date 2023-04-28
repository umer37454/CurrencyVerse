import { Button, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorComponent = () => {

  const navigate = useNavigate();

  function handleClick() {
    navigate('/')
  }

  return (
    <>
      <VStack
        wrap={'wrap'}
        mb={"20px"}
        mt={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"500px"}>
        <Button
          bgColor={"white"}
          color={"blackAlpha.900"}
          border="1px solid"
          borderColor="gray.500"
          onClick={handleClick}>Try Again</Button>
        <Text>There was an error while fetching a data</Text>
      </VStack>
    </>
  )
}

export default ErrorComponent;