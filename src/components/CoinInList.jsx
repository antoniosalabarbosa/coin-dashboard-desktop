const CoinInList = ( { name, priceAsk, priceBid, varBid } )=>{
   return (
        <div>
            <strong>{ name }</strong>
            <span> { priceAsk } </span>
            <span> { priceBid } </span>
            <span> { varBid } </span>
        </div>
    );
};

export default CoinInList;