import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../data/products";

const ProductDetail = () => {
  const products = getProducts();
  const { id } = useParams();
  const foundProduct = products.find((p) => p.id === Number(id));
  const navigate = useNavigate();

  useEffect(() => {
    if (!foundProduct) {
      navigate("/");
      return;
    }
  }, [foundProduct, navigate]);
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={foundProduct.image} alt={foundProduct.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{foundProduct.name}</h1>
            <p className="product-detail-price">{foundProduct.price}</p>
            <p className="product-detail-description">{foundProduct.description}</p>
            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
