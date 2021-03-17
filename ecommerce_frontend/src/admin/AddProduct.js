import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct, getCategories, getCollections} from './apiAdmin';

const AddProduct = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        collections: [],
        category: '',
        _collection: '',
        shipping: '',
        quantitySmall: '',
        quantityMed: '',
        quantityLarge: '',
        quantityFree: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        sizeSmall: false,
        sizeMed: false,
        sizeLarge: false,
        sizeFree: false,
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        collections,
        category,
        _collection,
        shipping,
        quantitySmall,
        quantityMed,
        quantityLarge,
        quantityFree,
        loading,
        error,
        createdProduct,
        sizeSmall,
        sizeMed,
        sizeLarge,
        sizeFree,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error:data.error});
            }
            else {
                getCollections().then(data2 => {
                    if (data2.error) {
                        setValues({...values, error:data.error});
                    }
                    else {
                        setValues({...values, categories: data, collections: data2, formData: new FormData()});
                    }
                });
            }
        });
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
                        quantitySmall: '',
                        quantityMed: '',
                        quantityLarge: '',
                        quantityFree: '',
                        sizeSmall: false,
                        sizeMed: false,
                        sizeLarge: false,
                        sizeFree: false,
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
                    Collection
                </label>
                <select onChange = {handleChange('_collection')}  className = "form-control">
                    <option disabled selected hidden>Please select...</option>
                    {collections && collections.map((c, i) => (
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
                    Sizes
                </label>
                <div className = "form-check">
                    <input onChange = {handleSize('sizeSmall')} id = "Small" type = "checkbox" className = "form-check-input" value = {sizeSmall}/>
                    <label className = "form-check-label" for="Small">Small</label>
                </div>

                <div className = "form-group" style = {{display: sizeSmall ? '' : 'none'}}>
                    <label className = "text-muted">
                        Quantity (Small)
                    </label>
                    <input onChange = {handleChange('quantitySmall')} type = "number" className = "form-control" value = {quantitySmall}/>
                </div>

                <div className = "form-check">
                    <input onChange = {handleSize('sizeMed')} id = "Med" type = "checkbox" className = "form-check-input" value = {sizeMed}/>
                    <label className = "form-check-label" for="Med">Medium</label>
                </div>

                <div className = "form-group" style = {{display: sizeMed ? '' : 'none'}}>
                    <label className = "text-muted">
                        Quantity (Medium)
                    </label>
                    <input onChange = {handleChange('quantityMed')} type = "number" className = "form-control" value = {quantityMed}/>
                </div>

                <div className = "form-check">
                    <input onChange = {handleSize('sizeLarge')} id = "Large" type = "checkbox" className = "form-check-input" value = {sizeLarge}/>
                    <label className = "form-check-label" for="Med">Large</label>
                </div>

                <div className = "form-group" style = {{display: sizeLarge ? '' : 'none'}}>
                    <label className = "text-muted">
                        Quantity (Large)
                    </label>
                    <input onChange = {handleChange('quantityLarge')} type = "number" className = "form-control" value = {quantityLarge}/>
                </div>

                <div className = "form-check">
                    <input onChange = {handleSize('sizeFree')} id = "Free" type = "checkbox" className = "form-check-input" value = {sizeFree}/>
                    <label className = "form-check-label" for="Free">Free Size</label>
                </div>

                <div className = "form-group" style = {{display: sizeFree ? '' : 'none'}}>
                    <label className = "text-muted">
                        Quantity (Free Size)
                    </label>
                    <input onChange = {handleChange('quantityFree')} type = "number" className = "form-control" value = {quantityFree}/>
                </div>
            </div>

            <button className = "btn btn-outline-primary">Create Product</button>
        </form>
    );

    const handleSize = (name) => event => {
        const value = event.target.checked;
        event.target.value = event.target.checked;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

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
                {JSON.stringify(values)}
            </div>
        </div>
            
        </Layout>        
    );
};

export default AddProduct;
