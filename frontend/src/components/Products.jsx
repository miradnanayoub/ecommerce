import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/products/all'); // Replace with your backend API endpoint
                setProducts(response.data);
                // console.log(products);
            } catch (err) {
                setError(err);
                console.error("Error fetching products:", err); // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display a user-friendly error message
    }

    return (
        <div>
            <h1>Product List</h1>
            <div className="container"> {/* Use CSS Grid or Flexbox for layout */}
                {products.map((product) => (


                    <div className="card">

                        <img className="product-img" src="https://dummyimage.com/260x260" />

                        <div className=" info ">
                            <h3 className="category">{product.category}</h3>
                            <h2 className="name">{product.name}</h2>
                            <p className="price">₹ {product.price}</p>
                        </div>
                    </div>


                ))}
            </div>
        </div>
    );
}

export default Products;