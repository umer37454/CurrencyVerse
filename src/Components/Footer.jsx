import { Box, Stack, VStack, Text } from '@chakra-ui/react';
import React from 'react'

const Footer = () => {
  return (
    <>
      <Box
        bgColor={"gray.800"}
        color={"white"}
        minH={"10"}
        px={"16"}
        py={["16", "8"]}>
        <Stack
          direction={["column", "row"]}
          h={"full"}
          alignItems={"center"}>

          <VStack
            w={"full"}
            alignItems={["center", "flex-start"]}>

            <Text
              fontWeight={"bold"}>
              About Us
            </Text>
            <Text
              fontSize={"sm"}
              textAlign={["center", "left"]}
              letterSpacing={"widest"}>
              One of the best Cryptocurrencies trading website that provides guidance for free
            </Text>
          </VStack>
        </Stack>
      </Box>
    </>
  )
}

export default Footer;