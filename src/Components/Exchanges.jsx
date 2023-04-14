import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Container, Image, Text, Heading, VStack, HStack } from '@chakra-ui/react'
import Loader from './Loader'
import Error from './Error'
import './exchanges.css'

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, [])

  if (error) return <Error />

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

const SearchBar = ({ exchanges }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  }

  const handleClear = () => {
    setSearchValue("");
  }

  const shouldDisplay = searchValue.length > 0;

  const filteredExchange = exchanges.filter((item) => {
    //storing name in one var and convert into lowercase
    const exchangeName = item.name.toLowerCase();
    //store search bar value in var and convert into lowercase
    const query = searchValue.toLowerCase();
    //matching both above vars
    return exchangeName.includes(query);
  })

  const displayExchange = filteredExchange.length > 0;

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInput}
        className="search-container" />
      {shouldDisplay && <button className="clear" onClick={handleClear}>Clear</button>}

      {displayExchange ? (<HStack wrap={"wrap"}>
        {filteredExchange.map((i) => {
          return (
            <ExchangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url} />
          );
        })}
      </HStack>) :
        (<NotAvailable />)
      }
    </>
  )
}

const NotAvailable = () => {
  return <div className="not-available">
    <VStack>
      <p>
        Not available what you are looking for
      </p>
      <Image
        src={"./images/notavailable.jpg"}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"not available img"} />
    </VStack>
  </div>
}

export const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        bg="gray.100"
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