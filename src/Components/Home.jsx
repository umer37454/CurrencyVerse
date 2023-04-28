import React from 'react'

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="container">

          <div>
            <h1>Currency Verse</h1>
            <p>This is a full stack responsive project that is made by Chakra UI components, React and a
              little bit of HTML/CSS. The backend involves CoinGecko API that is used to fetch the data dynamically...
              <a href="https://github.com/umer37454/CurrencyVerse" target="_blank">Click here for its Github Link</a>
            </p>
          </div>

          <img className="logo" src={"./images/logo1.png"} />
        </div>
      </header>

      <section className="box">
        <div className="container">

          <div className="cards">
            <h2>Coins</h2>
            <p>
              There is a Coins page on this website that can be access by clicking the above
              Coins button on the navbar. It shows the details of about 150+ Cryptocurrencies.
            </p>
          </div>

          <div className="cards">
            <h2>Exchanges</h2>
            <p>
              There is a Exchanges page on this website that can be access by clicking the above
              Exchanges button on the navbar. It links you to its home page.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;