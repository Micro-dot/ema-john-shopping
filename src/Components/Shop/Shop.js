import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../product/Product';
import'./Shop.css';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data));
    },[]);

    useEffect(()=>{
        const storedCart = getStoredCart();
        const saveCart = [];
        for (const id in storedCart){
            const adddProdct = products.find(product => product.id === id);
            if(adddProdct){
                const quantity = storedCart[id];
                adddProdct.quantity = quantity;
                saveCart.push(adddProdct);
            }
        }
        setCart(saveCart);
    },[products])

    const handleAddToCart = (selectedproduct) =>{
        console.log(selectedproduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedproduct);
        if(!exists){
            selectedproduct.quantity = 1;
            newCart = [...cart, selectedproduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedproduct);
            exists.quantity =exists.quantity + 1;
            newCart= [...rest, exists];
        }
        
        setCart(newCart)
        addToDb(selectedproduct.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=> <Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;