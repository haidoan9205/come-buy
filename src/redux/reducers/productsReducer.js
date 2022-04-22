import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: [],
  listProducts: [],
  product: null,
  code: null,
  removeCode: null
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.GET_LIST_PRODUCT:
      return { ...state, listProducts: payload };
    case ActionTypes.CREATE_NEW_PRODUCT:
      return { ...state, product: payload };
    case ActionTypes.CREATE_CODE:
      return { ...state, code: payload };
    case ActionTypes.UPDATE_PRODUCT: 
      return {...state, product: payload}
      case ActionTypes.REMOVE_SELECTED_PRODUCT:
        return {...state, removeCode : payload};
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED:
      return {};
    default:
      return state;
  }
};
