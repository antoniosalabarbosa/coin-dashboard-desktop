const CoinInList = ( { name, priceAsk, priceBid, varBid } )=>{
   return (
        <div className="coin_cointable">
            <strong>{ name }</strong>
            <span> { priceAsk } </span>
            <span> { priceBid } </span>
            <span> { varBid } </span>
        </div>
    );
};

export default CoinInList;