import React from 'react';

import './Product.css';

const product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div className="">
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock</small></p>
                <button 
                    className="main-btn"
                    onClick={()=> props.handleAddProduct(props.product)}
                    >
                    Add to cart
                </button>
            </div>

        </div>
    );
};

export default product;