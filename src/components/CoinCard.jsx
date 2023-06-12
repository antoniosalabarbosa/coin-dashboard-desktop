const CoinCard = ({ name, price, varBid })=>{
    return (
        <div className="coin_card_home">
            <strong>{ name }</strong>
            <div className="line"></div>
            <span className="price_coin_home">{ price }</span>
            <span className="var_coin_home">{ varBid }</span>
        </div>
    );
};

export default CoinCard;