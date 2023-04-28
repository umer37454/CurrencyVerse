import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Container, Image, Text, Heading, VStack, HStack, Button } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import './style.css'

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
    //setLoading(true);
  }

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, [page])

  if (error) return <ErrorComponent />

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (<Loader />) : (
          <SearchBar exchanges={exchanges} changePage={changePage} />
        )}
      </Container>
    </>
  );
}

const SearchBar = ({ exchanges, changePage }) => {
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
      <Text
        fontWeight={"bold"}
        fontSize={"2xl"}
        m={"4"}>
        Click on any exchange card to get to its home
      </Text>
      <div style={{ position: "sticky", top: "20px", width: "100%" }}>
        <input
          type="text"
          placeholder="Search... on this page"
          value={searchValue}
          onChange={handleInput}
          className="search-container" />
        {shouldDisplay && <button className="clear" onClick={handleClear}>Clear</button>}
      </div>

      {displayExchange ? (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"} mb={"15px"} mt={"20px"}>
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
          </HStack>

          <HStack mb={"20px"} mt={"10px"} justifyContent={"space-evenly"}>
            <Button bgColor={"white"} color={"blackAlpha.900"} border="1px solid" borderColor="gray.500" onClick={() => changePage(1)}>1st page</Button>
            <Button bgColor={"white"} color={"blackAlpha.900"} border="1px solid" borderColor="gray.500" onClick={() => changePage(2)}>2nd page</Button>
          </HStack>
        </>
      ) :
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