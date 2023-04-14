import React, { useState } from 'react'
import { HStack } from '@chakra-ui/react'
import { ExchangeCard } from './Exchanges';

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

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleInput} />
      {shouldDisplay && <button onClick={handleClear}>Clear</button>}

      <HStack wrap={"wrap"}>
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
    </div>
  )
}

export default SearchBar;