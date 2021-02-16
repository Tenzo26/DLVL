import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setstatusValues] = useState([]);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setOrders(data);
                }
            });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setstatusValues(data);
                }
            });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[]);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className = "text-danger display-2">
                    Total orders: {orders.length}
                </h1>
            );
        } 
        else {
            return (
                <h1 className = "text-danger display-2">
                    No Orders
                </h1>
            );
        }
    };

    const showInput = (key, value) => (
        <div className = "input-group mb-2 mr-sm-2">
            <div className = "input-group-prepend">
                <div className = "input-group-text">
                    {key}
                </div>
                <input type = "text" value = {value} className = "form-control" readOnly/>
            </div>
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
            .then(data => {
                if (data.error) {
                    console.log('Status update failed');
                }
                else {
                    loadOrders();
                }
            })
    };

    const showStatus = (o) => (
        <div className = "form-group">
            <h3 className = "mark mb-4">
                Status: {o.status}
            </h3>
                <select className = "form-control" 
                onChange = {(e) => handleStatusChange(e, o._id)}>
                    <option hidden disabled selected>Update Status</option>
                    {statusValues.map((status, index) => (
                        <option key = {index} value = {status}>
                            {status}
                        </option>
                    ))}
                </select>
        </div>
    );

    return (
        <Layout title = "Customer Orders" description = {`${user.name}, time to manage your orders!`}>
            
        <div className = "row">
            <div className = "col-md-8 offset-md-2">
                {showOrdersLength()}
                {orders.map((o, oIndex) => {
                    return (
                        <div className = "mt-5" key = {oIndex} style ={{borderBottom: '5px solid indigo'}}>
                            <h5 className = "mb-5">
                                <span className = "bg-primary">
                                    Order ID: {o._id}
                                </span>
                            </h5>
                            <ul className = "list-group mb-2">
                                <li className = "list-group-item">
                                    {showStatus(o)}
                                </li>
                                <li className = "list-group-item">
                                    Amount: &#8369;{o.amount}
                                </li>
                                <li className = "list-group-item">
                                    Ordered by: {o.user.name}
                                </li>
                                <li className = "list-group-item">
                                    Order Date: {moment(o.createdAt).fromNow()}
                                </li>
                                <li className = "list-group-item">
                                    Delivery Address: {o.address}
                                </li>
                            </ul>
                            <h3 className = "mt-4 mb-4 font-italic">
                                Total Products Ordered: {o.products.length}
                            </h3>

                            {o.products.map((p, pIndex) => (
                                    <div className = "mb-4" key = {pIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                                        {showInput('Name', p.name)}
                                        {showInput('Price', p.price)}
                                        {showInput('Count', p.count)}
                                        {showInput('Product ID', p._id)}
                                    </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
            
        </Layout>        
    );

};

export default Orders;