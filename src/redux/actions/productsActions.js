import { ActionTypes } from "../constants/action-types";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const createNewAProduct = (
  title,
  price,
  decription,
  image,
  category
) => {
  return async (dispatch) => {
    return await axios
      .post("https://6257f7380c918296a48eaa4a.mockapi.io/products", {
        title: title,
        price: price,
        description: decription,
        image: image,
        category: category,
      })
      .then((res) => {
        dispatch({
          type: ActionTypes.CREATE_NEW_PRODUCT,
          payload: res.data,
        });
        dispatch({
          type: ActionTypes.CREATE_CODE,
          payload: res.status,
        });
        if (res.status === 201) {
          toast.success("Saved success!");
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
};

export const updateAProduct = (
  id,
  title,
  price,
  decription,
  image,
  category
) => {
  return async (dispatch) => {
    return await axios
      .put("https://6257f7380c918296a48eaa4a.mockapi.io/products/" + id, {
        title: title,
        price: price,
        description: decription,
        image: image,
        rating: {
          rate: 3.6,
          count: 145,
        },
        category: category,
      })
      .then((res) => {
        dispatch({
          type: ActionTypes.UPDATE_PRODUCT,
          payload: res.data,
        });
        dispatch({
          type: ActionTypes.CREATE_CODE,
          payload: res.status,
        });
        if (res.status === 200) {
          toast.success("Updated success!");
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
};

export const getListProduct = () => {
  return async (dispatch) => {
    return await axios
      .get("https://6257f7380c918296a48eaa4a.mockapi.io/products")
      .then((res) => {
        dispatch({
          type: ActionTypes.GET_LIST_PRODUCT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
};

export const removeSelected = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED,
  };
}

export const removeProduct = (id) => {
  return async (dispatch) => {
    return await axios
      .delete("https://6257f7380c918296a48eaa4a.mockapi.io/products/" + id)
      .then((res) => {
        dispatch({
          type: ActionTypes.REMOVE_SELECTED_PRODUCT,
          payload: res.status,
        });
        if (res.status === 200) {
          window.location.replace("/");
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
};
