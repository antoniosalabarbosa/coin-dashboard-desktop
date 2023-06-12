const CoinCard = ({ name, price, varBid })=>{
    return (
        <div className="coin_card">
            <strong>{ name }</strong>
            <span>{ price }</span>
            <span>{ varBid }</span>
        </div>
    );
};

export default CoinCard;