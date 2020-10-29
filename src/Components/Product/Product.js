import React from 'react';
import { Link } from 'react-router-dom';

import './Product.css';

const product = (props) => {
    const {product, handleAddProduct} = props;
    const { img, name, seller, price, stock, key } = product;
    return (
        <div className="product">
            <div className="">
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock</small></p>
                { props.showAddToCart && <button 
                    className="main-btn"
                    onClick={()=> handleAddProduct(product)}
                    >
                    Add to cart
                </button>}
            </div>

        </div>
    );
};

export default product;