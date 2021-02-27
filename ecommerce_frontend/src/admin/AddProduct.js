import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct, getCategories} from './apiAdmin';

const AddProduct = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error:data.error});
            }
            else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        })
    };

    useEffect(() => {
        init();
    },[]);

    const handleChange = (name) => event => {
        const value = name === 'photo' ? 
            event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});
        createProduct(user._id, token, formData)
            .then(data => {
                if(data.error) {
                    setValues({...values, error: true, loading: false});
                }
                else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        error: false,
                        loading: false,
                        createdProduct: data.name
                    });
                }
            });
    };

    const newPostForm = () => (
        <form className = "mb-3" onSubmit={clickSubmit}>
            <h4>Import Photo</h4>
            <div className = "form-group">
                <label className = "btn btn-secondary">
                <input onChange = {handleChange('photo')} type = "file" name = "photo" accept = "image/*"/>
                </label>
            </div>

            <div className = "form-group">
                <label className = "text-muted">
                    Name
                </label>
                <input onChange = {handleChange('name')} type = "text" className = "form-control" value = {name}/>
            </div>

            <div className = "form-group">
                <label className = "text-muted">
                    Description
                </label>
                <textarea onChange = {handleChange('description')} className = "form-control" value = {description}/>
            </div>

            <div className = "form-group">
                <label className = "text-muted">
                    Price
                </label>
                <input onChange = {handleChange('price')} type = "number" className = "form-control" value = {price}/>
            </div>

            <div className = "form-group">
                <label className = "text-muted">
                    Category
                </label>
                <select onChange = {handleChange('category')}  className = "form-control">
                    <option disabled selected hidden>Please select...</option>
                    {categories && categories.map((c, i) => (
                        <option key = {i }value = {c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className = "form-group">
                <label className = "text-muted">
                    Shipping
                </label>
                <select onChange = {handleChange('shipping')}  className = "form-control">
                    <option disabled selected hidden>Please select...</option>
                    <option value = "1">Available</option>
                    <option value = "0">Not Available</option>
                </select>
            </div>

            <div className = "form-group">
                <label className = "text-muted">
                    Quantity
                </label>
                <input onChange = {handleChange('quantity')} type = "number" className = "form-control" value = {quantity}/>
            </div>

            <button className = "btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className = "alert alert-danger" style = {{display: error ? '' : 'none'}}>
            <h5>
                Insufficient Details! Please review your input and try again.
            </h5>
        </div>
    );

    const showSuccess = () => (
        <div className = "alert alert-success" style = {{display: createdProduct ? '' : 'none'}}>
            <h5>{createdProduct} is successfully created!</h5>
        </div>
    );

    const showLoading = () => (
        loading && (<div className = "alert alert-info">
            <h5>Loading...</h5>
        </div>)
    );

    return (
        <Layout title = "Create a new Product" description = {`Ready to add a new product, ${user.name}!`}>
            
        <div className = "row">
            <div className = "col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
            
        </Layout>        
    );
};

export default AddProduct;
