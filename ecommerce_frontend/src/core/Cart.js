import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import Card from './Card';
import {getCart, removeItem, emptyCart} from './cartHelpers';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    useEffect(() => {
        setItems(getCart());
      }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {items.length} item{items.length == 1 ? '' : 's'}</h2>
                <hr/>
                    <div className = "col-5">
                    {items.map((product, i) => (
                        <div className="mb-3" key={i}>
                            <Card  
                            product={product} 
                            showAddToCartButton = {false} 
                            cartUpdate = {true}
                            showRemoveProductButton = {true}
                            setRun={setRun}
                            run={run}
                            />
                        </div>
                    ))}
                    </div>
            </div>
        );
    }

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br/>
            <Link to = "/shop">Continue shopping</Link>
        </h2>
    );

    const showCheckoutColumn = () => {
        return (
            <span>
            <h2 className = "mb-4">Your cart summary</h2>
            <hr/>
            <Checkout products = {items} setRun={setRun} run={run}/>
            </span>
        )
    };

    return (
        <Layout title = "Shopping Cart" 
        description = "Manage your Cart here"
        className = "container-fluid">

            <div className = "row">
                <div className = "col-6">
                    {items.length > 0 ? 
                        showItems(items) :
                        noItemsMessage()}
                </div>

                <div className = "col-6">
                    {items.length > 0 ? showCheckoutColumn() : (
                        <h2>Nothing to check out here...</h2>
                    )}
                </div>
            </div>

        </Layout>
    );
    
};



export default Cart;