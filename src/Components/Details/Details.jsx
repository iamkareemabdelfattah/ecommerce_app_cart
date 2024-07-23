import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";


export default function Details ()
{
  let { id } = useParams();
  const [ details, setDetails ] = useState( {} );
  const [ isLoading, setIsLoading ] = useState( true );

  async function getDetails ( )
  {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    setDetails( data.data );
    setIsLoading( false );
  }

  useEffect( () =>
  {
    getDetails( id );
}, [] );

  return (
    <>
      <div className="container">
        { isLoading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x">
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
        ) : (
          <div className="row align-items-center">
            <div className="col-md-4">
                <img src={ details.imageCover } className="w-100" alt="" />
            </div>
            <div className="col-md-8 position-relative">
              <h3>{ details.title }</h3>
              <p className="text-secondary">{ details.description }</p>
              <p>{ details.category.name }</p>
              <div className="d-flex justify-content-between">
                <p>{ details.price } EGP</p>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  { details.ratingsAverage }
                </span>
              </div>

                <i
                  className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "
                >
                </i>


                <i
                  className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "
                ></i>

              <button
                className="btn bg-main text-white w-100"
              >
                Add To Cart +
              </button>
            </div>
          </div>
        ) }
      </div>
    </>
  );
}
