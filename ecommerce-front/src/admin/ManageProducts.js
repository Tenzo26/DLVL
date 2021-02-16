import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from './apiAdmin';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setProducts(data);
                    console.log("Products loaded");  
                }
            });
        };

    const destroy = productId => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    loadProducts();   
                }
            })
    };
    
    useEffect(() => {
        loadProducts();
    },[]);

    const showProducts = () => {
        return (
            <div>
                <table className = "table table-striped">
            <thead className = "thead-dark">
                <tr>
                <th scope="col">Products (Total: {products.length})</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, i) => (
                    <tr key = {i}>
                        <td>
                            {product.name}
                        </td>
                        <td>
                            <Link to = {`/admin/product/update/${product._id}`}>
                                    <span className = "badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                        </td>
                        <td>
                            <button onClick = {() => destroy(product._id)} className = "badge badge-danger badge-pill">
                                        Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            </div>
        );
    };

    return (
        <Layout title = "Manage Products" 
        description = "Modify or Remove Products Here"
        className = "container-fluid">

            <div className = "row">
                <div className = "col-12">
                <h2 className = "text-center"></h2>  
                {showProducts()}
                    <hr/>
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;

