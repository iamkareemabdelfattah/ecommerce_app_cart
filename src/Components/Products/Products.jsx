import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';


const Products = () =>
{
  const [ products, setProducts ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );

  async function getProducts ()
  {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log( data );
    setProducts( data.data );
    setIsLoading( false );
  }

  useEffect( () =>
  { 
    getProducts();
  }
    , [] );

  return (
    <>
      <Helmet>
        <title>Products Page</title>
      </Helmet>

      <div className="container pt-5">
        <div className="row g-4">
          { isLoading ? (
            <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute start-0  vh-100 d-flex justify-content-center align-items-center ">
              <ThreeDots
                height="80"
                width="200"
                radius="9"
                color="#0aad0a"
                ariaLabel="three-dots-loading"
                wrapperStyle={ {} }
                wrapperClassName=""
                visible={ true }
              />
            </div>
          ) : null }

          { products?.map( ( product, i ) => (
            <div key={ i } className="col-md-3 h-25 ">
              <div className="card">
                <div className="product py-3 px-2 position-relative px-3 overflow-hidden">

                    <i
                      className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "
                    >
                    </i>

                    <i
                      className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "
                    ></i>

                  <Link
                    to={ `/details/${ product.id }` }
                    className="text-decoration-none "
                  >
                    <img
                      src={ product.imageCover }
                      alt=""
                      className="w-100 p-2"
                    />
                    <span className="text-main font-sm fw-bold">
                      { product.category.name }
                    </span>
                    <h3 className="h6">
                      { product.slug.split( "-" ).slice( 0, 2 ).join( " " ) }
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{ product.price } EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        { product.ratingsAverage }
                      </span>
                    </div>
                  </Link>
                    <button className="btn bg-main text-white w-100 my-2">
                      <i className="fas fa-spinner fa-spin"></i> Adding...
                    </button>
                    <button
                      className="btn bg-main text-white w-100 my-2"
                    >
                      Add to Cart +
                    </button>
                </div>
              </div>
            </div>
          ) ) }
        </div>
      </div>

    </>
  )
}

export default Products
