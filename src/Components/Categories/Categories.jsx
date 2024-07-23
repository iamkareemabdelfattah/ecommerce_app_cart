import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";


const Categories = () =>
{
  let [ categories, setCategories ] = useState( [] );
  let [ isLoading, setIsLoading ] = useState( true );

  async function getCategories ()
  {
    let { data } = await axios.get( `https://ecommerce.routemisr.com/api/v1/categories` );
    setCategories( data.data );
    setIsLoading( false );
  }

  useEffect( () =>
  {
    getCategories();
  }, [] );

  return (
    <div>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {
        isLoading ?
          <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute start-0  vh-100 d-flex justify-content-center align-items-center ">
            <div>
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
          </div>
          :
          <>
            <div className="container">
              <h1 className="text-main text-center m-3">All Categories</h1>
              <div className="row ">
                { categories.map( ( category, i ) => (
                  <div key={ i } className="col-md-3 ">
                    <div className="card mb-4">
                      <div className="card-img ">
                        <img
                          src={ category.image }
                          className="w-100"
                          alt={ category.name }
                          height={ "400px" }
                        />
                      </div>
                      <div className="card-body bg-body-tertiary"><p>{ category.name }</p></div>
                    </div>
                  </div>
                ) ) }
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default Categories;
