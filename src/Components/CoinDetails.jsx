import React, { useEffect, useState } from 'react'
import { Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Box } from '@chakra-ui/react'
import { server } from '../main'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorComponent from './ErrorComponent'
import Footer from './Footer'

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  //destructuring url params
  const { id } = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`);
        setCoin(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id])

  if (error) return <ErrorComponent />

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? <Loader /> : (
          <>
            <RadioGroup value={currency} onChange={setCurrency} mt={"30px"}>
              <HStack justifyContent={"space-evenly"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"eur"}>EUR</Radio>
                <Radio value={"usd"}>USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack
              border={"1px solid #E2E8F0"}
              m={"30px"}
              spacing={"4"}
              p={"8"}
              alignItems={"flex-start"}>
              <Text
                fontSize={"small"}
                alignSelf={"center"}
                opacity={0.7}>
                Last Updated on {" "}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image
                src={coin.image.large}
                w={"20"}
                h={"20"}
                objectFit={"contain"}
                alignSelf={"center"} />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_24h > 0 ? "increase" : "decrease"} />
                  {coin.market_data.price_change_24h.toFixed(2)}%
                </StatHelpText>
              </Stat>

              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}>
                {`#${coin.market_cap_rank}`}
              </Badge>

              <Box w={"full"}>
                <Item
                  title={"Max Supply"}
                  value={coin.market_data.max_supply ? coin.market_data.max_supply : "Not Available"} />
                <Item
                  title={"Circulating"}
                  value={coin.market_data.circulating_supply ? coin.market_data.circulating_supply.toFixed(0) : "Not Available"} />
                <Item
                  title={"Market Cap"}
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              </Box>
            </VStack>
          </>
        )}
      </Container>

      <Footer />
    </>
  )
}

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} m={"5px"}>
      <Text fontWeight={"bold"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
}

export default CoinDetails;