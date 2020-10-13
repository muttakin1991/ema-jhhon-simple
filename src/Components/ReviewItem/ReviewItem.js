import React from 'react';

const ReviewItem = (props) => {
    console.log(props)
    const {name, quantity} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid ligthgray',
        marginBottom:'5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    };
    const quantityStyle = {
        border: '1px solid salmon',
        borderRadius: '5px',
        width: '100px',
        padding: '5px',
        backgroundColor: 'green',
        color: 'white'

    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p style={quantityStyle}>Quantity: {quantity}</p>
            <br/>
            <button className="main-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;