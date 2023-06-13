import React from "react";

const Home = ()=>{

    const baseURL = "https://economia.awesomeapi.com.br/last/";
    const baseCoin = "BRL";

    const CoinCard = React.lazy( ()=> import("../components/CoinCard") );

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

    return (
        <>
            <section id="HOME">
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
            </section>
        </>
    );
};

export default Home;