import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const tax = (total /10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formateNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4 className="text-primary">order summary</h4>
            <p>Items Orderd: {cart.length}</p>
            <p><small>Product Price: {formateNumber(total)}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p><small>shipping: {shipping}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            <Link to="/review">
            <button className="main-btn">Review order</button>
            </Link>
        </div>
    );
};

export default Cart;