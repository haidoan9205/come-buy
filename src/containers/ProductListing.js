import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct, setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.listProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct())
  }, []);

  return (
    <div className="ui grid container">
      <ProductComponent  />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default ProductPage;
