import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Container, HStack, Image, Text, Heading, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import SearchBar from './SearchBar'

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchExchanges = async () => {
      const { data } = await axios.get(`${server}/exchanges`);

      setExchanges(data);
      setLoading(false);
    };

    fetchExchanges();
  }, [])

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (<Loader />) : (
          <>
            <SearchBar exchanges={exchanges} />
            {/* <HStack wrap={"wrap"}>
              {exchanges.map((i) => {
                return (
                  <ExchangeCard
                    key={i.id}
                    name={i.name}
                    img={i.image}
                    rank={i.trust_score_rank}
                    url={i.url} />
                );
              })}
            </HStack> */}
          </>)}
      </Container>
    </>
  );
}

export const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"base"}
        p={"8"}
        borderRadius={"lg"}
        m={"4"}
        transition={"all 0.3s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }} >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"exchange img"} />

        <Heading size={"md"} noOfLines={1}>{rank}</Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
}

export default Exchanges;