import * as React from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../styles/productsPage/productsPage.css';

export const ProductsPage = (props) => {
    const { products, setProducts } = props.searchResults;

    //Get products from back-end api
    React.useEffect(() => {
        if(window.location.search === '') {
            async function fetchProducts() {
                let res = await Axios.get('/api/products')
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        console.log(err)
                    });
                setProducts(res.data);
            }
            fetchProducts();
        }
    }, []);

    return(
        <div className='main-products-container'>
            <h1 className="title">Our Products</h1>
            <div className="products-container">
                {products.map(product => {
                    return(
                        <a key={product._id} className="product" href={`/products/${product._id}`}>
                            <img src={product.imageURL} className="product-photo" alt=""/>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="price">${product.price.toFixed(2)}</p>
                        </a>
                    );
                })}
            </div>
            {/* Pagination component */}
            {/* <ReactPaginate 
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            /> */}
        </div>
    );
};