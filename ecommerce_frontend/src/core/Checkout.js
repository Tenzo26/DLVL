import React, {useState, useEffect} from 'react';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createOrder} from './apiCore';
import {emptyCart, updateSize, syncCarttoCatalog} from './cartHelpers';

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

    const submitOrder = (e) => {
        e.preventDefault();
            setData({
                loading: true
            });
        
        let proceed = true
        products.map((product, i) => {
            if (
                product.size == "Small" && (product.quantitySmall < product.count) ||
                product.size == "Medium" && (product.quantityMed < product.count) ||
                product.size == "Large" && (product.quantityLarge < product.count) ||
                product.size == "Free Size" && (product.quantitySmall < product.count)
            )
                {
                    proceed = false;
                    setData({
                        loading: false,
                        error: "Your desired quantity on your " + product.name + " doesn't match our stocks! Please try again"
                    });
                }
        });

        if (proceed) {
            const amount = getTotal();
            const createOrderData = {
                products: products,
                amount: amount,
                address: delivery_address,
            };
            
            createOrder(userId, token, createOrderData)
                .then(data2 => {
                    if (data2.error) {
                        setData({...data, error: data2.error});
                    }

                    else {
                        setRun(!run);
                        emptyCart(userId, token, () => {
                                setData({
                                    loading: false,
                                    success: true
                                });
                        });
                        alert("Order has been successfully placed! Please check your mail to confirm your order. Make sure to keep in touch with us for the transaction!");
                    }               
                });
        }
        
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

    const handleSize = (productId) => (event) => {
		updateSize(productId, event.target.value)
        setRun(!run)
	};

    const showSummaryBreakdown = () => {
        return (
            <div>
            <form onSubmit = {submitOrder}>
                <table className = "table table-striped">
            <thead className = "thead-dark">
                <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Small</th>
                <th scope="col">Medium</th>
                <th scope="col">Large</th>
                <th scope="col">Free Size</th>
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
                    <td>
                        {product.sizeSmall && product.quantitySmall > 0 ? 
                            <input value = "Small" onChange = {handleSize(product._id)}  name = {product.name} checked = {product.size == "Small" && product.quantitySmall > 0} type = "radio" required/>
                            : "N/A"}
                    </td>
                    <td>
                        {product.sizeMed && product.quantityMed > 0 ? 
                            <input value = "Medium" onChange = {handleSize(product._id)}  name = {product.name} checked = {product.size == "Medium" && product.quantityMed > 0} type = "radio" required/>
                            : "N/A"}
                    </td>
                    <td>
                        {product.sizeLarge && product.quantityLarge > 0  ? 
                            <input value = "Large" onChange = {handleSize(product._id)}  name = {product.name} checked = {product.size == "Large" && product.quantityLarge > 0} type = "radio" required/>
                            : "N/A"}
                    </td>
                    <td>
                        {product.sizeFree && product.quantityFree > 0  ? 
                            <input value = "Free Size" onChange = {handleSize(product._id)}  name = {product.name} checked = {product.size == "Free Size" && product.quantityFree > 0} type = "radio" required/>
                            : "N/A"}
                    </td>
                </tr>
            ))}
            <tr>
                <td>&nbsp;</td>
                <td>Total:</td>
                <td><b>&#8369;{getTotal()}</b></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td> 
            </tr>
            </tbody>
            </table>
            <div className = "form-group mb-3">
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
            </div>
        )
      
    };

    return (
        <div>
            {products.length > 0 ? showSummaryBreakdown() : null}
            {showLoading(data.loading)}
            {showError(data.error)}
            {showSuccess(data.success)}
            {JSON.stringify(products)}
        </div>
    )
};

export default Checkout;