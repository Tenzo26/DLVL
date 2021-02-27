import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const{user, token} = isAuthenticated();
    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error) {
                    setError(true);
                }
                else {
                    setError('');
                    setSuccess(true);
                }
            });
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className = "form-group">
                <label className = "text-muted">
                    Category Name
                </label>
                <input type = "text" className = "form-control" onChange={handleChange} value = {name} autoFocus required/>
            </div>
            <button className = "btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className = "alert alert-success">"{name}" Category is Created.</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className = "alert alert-danger">Failed to create Category "{name}". The category may already exist.</h3>
        }
    }

    const goBack = () => (
        <div className = "mt-5">
            <Link to = "/admin/dashboard" className = "text-warning">Back to Dashboard</Link>
        </div>
    );

    return (
        <Layout title = "Create a new Category" description = {`Awaiting orders, ${user.name}!`}>
            
        <div className = "row">
            <div className = "col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
            </div>
        </div>
            
        </Layout>        
    );
};

export default AddCategory;