import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import { Container, Image, Text, Heading, VStack, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import './style.css'

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    //setLoading(true);
  }

  //per_page=50&
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page])

  if (error) return <ErrorComponent />

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (<Loader />) : (
          <SearchBar coins={coins} currencySymbol={currencySymbol} changePage={changePage}
            currency={currency} setCurrency={setCurrency} />
        )}
      </Container>
    </>
  );
}

const SearchBar = ({ coins, currencySymbol, changePage, currency, setCurrency }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  }

  const handleClear = () => {
    setSearchValue("");
  }

  const shouldDisplay = searchValue.length > 0;

  const filteredCoins = coins.filter((item) => {
    //storing name in one var and convert into lowercase
    const coinsName = item.name.toLowerCase();
    //store search bar value in var and convert into lowercase
    const query = searchValue.toLowerCase();
    //matching both above vars
    return coinsName.includes(query);
  })

  const displayCoins = filteredCoins.length > 0;

  return (
    <>
      <Text
        fontWeight={"bold"}
        fontSize={"2xl"}
        m={"4"}>
        Click on any coin card to get more details about it
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

      {displayCoins ? (
        <>
          <RadioGroup value={currency} onChange={setCurrency} mb={"15px"} mt={"20px"}>
            <HStack justifyContent={"space-evenly"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {filteredCoins.map((i) => {
              return (
                <CoinsCard
                  key={i.id}
                  id={i.id}
                  name={i.name}
                  price={i.current_price}
                  img={i.image}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol} />
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

export const CoinsCard = ({ id, name, img, symbol, price, currencySymbol }) => {
  return (
    <Link to={`/coin/${id}`}>
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
          alt={"coin img"} />

        <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
}

export default Coins;