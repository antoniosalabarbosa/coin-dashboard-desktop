import React from "react";
import arrow_down from "../img/icons/arrow_down.png";

const Home = ()=>{

    const CoinCard = React.lazy( ()=> import("../components/CoinCard") );
    const CoinList = React.lazy( ()=> import("../components/CoinInList") );

    const baseURL = "https://economia.awesomeapi.com.br/last/";
    const baseCoin = "BRL";

    const [initialCoins, setInitialCoins] = React.useState([]);

    const API = async ( coin, coinin = baseCoin )=>{
        const response = await fetch(`${baseURL + coin}-${coinin}`)
        .then(r => r.json());
        
        return response;
    };

    React.useEffect(()=>{
        (async ()=>{
            setInitialCoins([
                Object.values(await API("USD"))[0],
                Object.values(await API("EUR"))[0],
                Object.values(await API("BTC"))[0]
            ]);
        })();
    }, []);

    //

    

    return (
        <>
            <section id="HOME">

                <h1>Default Coin: { baseCoin }</h1>

                <div className="coin_list_home">
                    
                    <React.Suspense fallback={<h1>Carregando...</h1>}>
                    {
                        initialCoins ? 
                        initialCoins.map(( { code, bid, varBid } )=>{
                            return (
                                <CoinCard
                                    key={code}
                                    name={code}
                                    price={bid}
                                    varBid={varBid}
                                />
                            );
                        })
                        : <strong>There are no coins</strong>
                    }
                    </React.Suspense>
                </div>

                <button>
                    <img src={arrow_down} alt="Arrow Down" />
                </button>
            </section>

            <section id="COINTABLE">
                <div className="container_coin_table">

                </div>
            </section>
        </>
    );
};

export default Home;