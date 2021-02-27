import React, {useState, useEffect} from 'react';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createOrder} from './apiCore';
import {emptyCart} from './cartHelpers';

const Checkout = ({products,setRun = f => f, run = undefined}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const handleAddress = event => {
        setData({...data, address: event.target.value});
    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + (nextValue.count * nextValue.price);
        },0);
    };

    let delivery_address = data.address;

    const submitOrder = () => {
        setData({
            loading: true
        });
        const amount = getTotal();
        const createOrderData = {
            products: products,
            amount: amount,
            address: delivery_address
        }

        console.log(createOrderData);
        
        createOrder(userId, token, createOrderData);
        setRun(!run);
        emptyCart(() => {
                setData({
                    loading: false,
                    success: true
                });
        });
        alert("Order has been successfully placed! Please check your mail to confirm your order. Make sure to keep in touch with us for the transaction!");
        console.log('payment success and empty cart');
    };

    const showError = error => (
        <div className = "alert alert-danger" 
        style = {{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className = "alert alert-success" 
        style = {{display: success ? '' : 'none'}}>
            Order has been successfully placed! Please check your mail to confirm your order. Make sure to keep in touch with us for the transaction!
        </div>
    );

    const showLoading = (loading) => (
        loading && <h2>Loading</h2>
    )

    //onBlur = {() => setData({...data, error: ''})}

    const showCheckout = () => {
        return isAuthenticated() ? (
                <form onSubmit = {submitOrder}>
                <div className = "gorm-group mb-3">
                <label className = "text-muted">Delivery Address <b>(required)</b>:</label>
                <textarea onChange = {handleAddress}
                    className = "form-control"
                    value = {data.address}
                    placeholder = "Enter your delivery address here..."
                    required
                />
                </div>
                <button type = "submit" className = "btn btn-success btn-block" >Submit Order</button>
                </form>
            ):(
                <Link to = "/signin">
                    <button className = "btn btn-primary">Sign in to Checkout</button>
                </Link>
            );
    };

    const showSummaryBreakdown = () => {
        return (
            <div>
                <table className = "table table-striped">
            <thead className = "thead-dark">
                <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
            {products.map((product, i) => (
                <tr key = {i}>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        <b>{product.count}</b>
                    </td>
                    <td>
                        &#8369;{product.count * product.price}
                    </td>
                </tr>
            ))}
            <tr>
                <td>&nbsp;</td>
                <td>Total:</td>
                <td><b>&#8369;{getTotal()}</b></td>
            </tr>
            </tbody>
            </table>
            </div>
        )
      
    };

    return (
        <div>
            {products.length > 0 ? showSummaryBreakdown() : null}
            {showLoading(data.loading)}
            {showError(data.error)}
            {showSuccess(data.success)}
            {showCheckout()}
        </div>
    )
};

export default Checkout;