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
                <th scope="col">Category</th>
                <th scope="col">Collection</th>
                <th scope="col">Small</th>
                <th scope="col">Medium</th>
                <th scope="col">Large</th>
                <th scope="col">Free Size</th>
                <th scope="col">Shipping</th>
                <th scope="col">Sold (Small)</th>
                <th scope="col">Sold (Medium)</th>
                <th scope="col">Sold (Large)</th>
                <th scope="col">Sold (Free Size)</th>
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
                                    <button 
                                    style={{
									backgroundColor: "#52c41a",
									color: "#fff",
								}}
                                    className = "badge badge-warning badge-pill">
                                        Update
                                    </button>
                                </Link>
                        </td>
                        <td>
                            <button onClick = {() => destroy(product._id)} className = "badge badge-danger badge-pill">
                                        Delete
                            </button>
                        </td>
                        <td>
                            {product.category.name}
                        </td>
                        <td>
                            {product._collection ? product._collection.name : "-"}
                        </td>
                        <td>
                            {product.sizeSmall ? product.quantitySmall : '-'}
                        </td>
                        <td>
                            {product.sizeMed ? product.quantityMed : '-'}
                        </td>
                        <td>
                            {product.sizeLarge ? product.quantityLarge : '-'}
                        </td>
                        <td>
                            {product.sizeFree ? product.quantityFree : '-'}
                        </td>
                        <td>
                            {product.shipping ? "Available" : "Not Available"}
                        </td>
                        <td>
                            {product.sizeSmall ? product.soldSmall : '-'}
                        </td>
                        <td>
                            {product.sizeMed ? product.soldMed : '-'}
                        </td>
                        <td>
                            {product.sizeLarge ? product.soldLarge : '-'}
                        </td>
                        <td>
                            {product.sizeFree ? product.soldFree : '-'}
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


