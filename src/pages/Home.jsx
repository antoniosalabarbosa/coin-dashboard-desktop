import React from "react";
import arrow_down from "../img/icons/arrow_down.png";

const Home = ()=>{

    const CoinCard = React.lazy( ()=> import("../components/CoinCard") );
    const CoinList = React.lazy( ()=> import("../components/CoinInList") );

    const baseURL = "https://economia.awesomeapi.com.br/last/";
    const [baseCoin] = React.useState("BRL");
    const [i_coins] = React.useState("USD,EUR,BTC");
    const [p_coins] = React.useState("CAD,GBP,JPY,ARS,RUB");

    const [initialCoins, setInitialCoins] = React.useState([]);
    const [principalCoins, setPrincipalCoins] = React.useState([]);

    const API = async ( coin, coinin = baseCoin )=>{
        const response = await fetch(`${baseURL + coin}-${coinin}`)
        .then(r => r.json());
        
        return response;
    };

    const getInitialCoins = async () => {
        setInitialCoins([...Object.values(await API(i_coins))]);
    }

    const getPrincipalCoins = async ()=>{
        setPrincipalCoins([...Object.values(await API(p_coins))])
    };

    React.useEffect(()=>{
        getInitialCoins();
        getPrincipalCoins();
    }, []);
    
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
                                    key={`${code}_card`}
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
                <div className="container_cointable">
                    <div className="informations_cointable">
                        <span>Coin</span>
                        <span>Ask</span>
                        <span>Bid</span>
                        <span>Variation bid</span>
                    </div>
                    
                    <React.Suspense>
                    {
                        (principalCoins) ? 
                        principalCoins.map(( { code, ask, bid, varBid } )=>{
                            return (
                                <CoinList
                                    key={`${code}_card`}
                                    name={code}
                                    priceAsk={ask}
                                    priceBid={bid}
                                    varBid={varBid}
                                />
                            );
                        })

                        : <strong>There are no coins</strong>
                    }
                    </React.Suspense>
                </div>
            </section>
        </>
    );
};

export default Home;